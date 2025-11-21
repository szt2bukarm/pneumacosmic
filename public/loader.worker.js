self.onmessage = async (e) => {
  const urls = e.data;

  try {
    const bitmaps = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return await createImageBitmap(blob);
      })
    );

    // Transfer each bitmap, not the array object itself
    self.postMessage(bitmaps, bitmaps.map(b => b));
  } catch (error) {
    console.error("Worker error:", error);

    // Return an empty list (no transferable items)
    self.postMessage([], []);
  }
};
