export default async function getPixabayImage(keyword) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${encodeURIComponent(
        keyword
      )}&image_type=photo&per_page=3`
    );

    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      return data.hits[0].webformatURL;
    } else {
      return "/fallback-food.jpg"; // Public fallback image
    }
  } catch (err) {
    console.error("Pixabay fetch error:", err);
    return "/fallback-food.jpg";
  }
}
