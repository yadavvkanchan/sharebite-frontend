import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
from pymongo import MongoClient

st.set_page_config(page_title="ShareBite Analytics", layout="wide")

# MongoDB connection
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "sharebite"
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Load data
@st.cache_data
def load_data():
    client = MongoClient("mongodb://localhost:27017")
    db = client["sharebite"]

    # --- NEEDIES ---
    needies_raw = list(db["needies"].find())
    if len(needies_raw) == 0:
        needies = pd.DataFrame(columns=["state","city"])
    else:
        # Flatten address
        needies = pd.json_normalize(needies_raw)
        needies["city"] = needies["address.city"].fillna("Unknown").str.title()
        needies["state"] = needies["address.state"].fillna("Unknown").str.title()

    # --- DONATIONS ---
    donations_raw = list(db["donations"].find())
    if len(donations_raw) == 0:
        donations = pd.DataFrame(columns=["state","city"])
    else:
        donations = pd.DataFrame(donations_raw)
        # Use accessedLocation as city
        donations["city"] = donations["accessedLocation"].fillna("Unknown").str.title()
        # If state info is missing, default to "Unknown"
        donations["state"] = "Unknown"

    # Aggregate counts
    needy_agg = needies.groupby(["state","city"]).size().reset_index(name="needy_count")
    donation_agg = donations.groupby(["state","city"]).size().reset_index(name="donations")

    # Merge
    df = pd.merge(needy_agg, donation_agg, on=["state","city"], how="outer").fillna(0)

    return df


df = load_data()

if df.empty:
    st.warning("No data available")
    st.stop()

# Metrics
df = load_data()

# Metrics
df["need_ratio"] = df["needy_count"] / (df["donations"] + 1)
df["credit_score"] = (df["donations"] / (df["needy_count"] + 1)) * 100
df["predicted_need_level"] = np.where(df["need_ratio"] > 2, "High",
                               np.where(df["need_ratio"] > 1.2, "Medium", "Low"))

# Filters
states = ["All"] + sorted(df["state"].unique())
selected_state = st.selectbox("Select State", states)
filtered_df = df if selected_state=="All" else df[df["state"]==selected_state]

cities = ["All"] + sorted(filtered_df["city"].unique())
selected_city = st.selectbox("Select City", cities)
if selected_city != "All":
    filtered_df = filtered_df[filtered_df["city"]==selected_city]

# Charts
if not filtered_df.empty:
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("🔥 Cities Needing Donations")
        fig1 = px.bar(filtered_df.sort_values("need_ratio", ascending=False),
                      x="city", y="need_ratio", color="state", text="needy_count")
        st.plotly_chart(fig1, use_container_width=True)
    
    with col2:
        st.subheader("🏅 Top Donating Cities")
        fig2 = px.bar(filtered_df.sort_values("credit_score", ascending=False),
                      x="city", y="credit_score", color="state", text="donations")
        st.plotly_chart(fig2, use_container_width=True)
    
    # City-wise summary
    st.markdown("### 📍 City-wise Summary")
    st.dataframe(filtered_df[["state","city","needy_count","donations","need_ratio","credit_score","predicted_need_level"]])
    
    # Highlight most urgent city safely
    if not filtered_df["need_ratio"].empty:
        max_need = filtered_df.loc[filtered_df["need_ratio"].idxmax()]
        st.success(f"🏙️ {max_need['city']} ({max_need['state']}) needs urgent food donations!")
else:
    st.info("No data available for the selected filters.")
