const BASE_URL = "/api/LostItem";
import {getAuthToken} from "../../util/auth";

// Fetch items by type: 0 for lost, 1 for found
export async function fetchItemsByType(type) {
  try {
    const response = await fetch(`${BASE_URL}/by-type/${type}`);
    if (!response.ok) throw new Error("فشل في جلب البيانات");
    const data = await response.json();
    console.log("/api/LostItem :::" , data.results  );
    // If the backend returns an object with a 'results' array, return that; otherwise, return the data directly
    return data.results || data;
  } catch (error) {
    console.error("Error fetching items by type:", error);
    throw error;
  }
}

// Convenience function for fetching lost items (type 0)
export async function fetchLostItems() {
  return fetchItemsByType(0);
}

// Convenience function for fetching found items (type 1)
export async function fetchFoundItems() {
  return fetchItemsByType(1);
}

// Search lost/found items by image
export async function searchLostFoundByImage(imageFile) {
  const formData = new FormData();
  formData.append("queryImage", imageFile);

  let response;
  try {
    response = await fetch(`${BASE_URL}/search-by-image`, {
      method: "POST",
      body: formData,
    });
  } catch (fetchErr) {
    console.error("Network error:", fetchErr);
    throw new Error("تعذر الاتصال بالسيرفر");
  }

  const text = await response.text();
  console.log("API status:", response.status);
  console.log("API response text:", text);

  if (!response.ok) {
    throw new Error(`فشل البحث بالصورة | Status: ${response.status} | Response: ${text}`);
  }

  try {
    const data = JSON.parse(text);
    return data.results || data;
  } catch (e) {
    throw new Error("الرد ليس JSON: " + text);
  }
}

// Delete a lost/found item by ID (admin or owner)
export async function deleteLostFoundItem(itemId) {
    const token = getAuthToken();
  try {
    const response = await fetch(`${BASE_URL}/delete/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('فشل في حذف العنصر');
    return true;
  } catch (error) {
    console.error('Error deleting lost/found item:', error);
    throw error;
  }
}