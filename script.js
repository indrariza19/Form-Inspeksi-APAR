document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("aparForm");
  const submitBtn = document.getElementById("submit-btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Menyimpan...";

    const formData = new URLSearchParams(new FormData(form));
    console.log("Mengirim data:", formData.toString());

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Respon server:", data);
        if (data.status === "success") {
          showToast("Data berhasil disimpan", "success");
          form.reset();
        } else {
          showToast("Gagal: " + data.message, "error");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        showToast("Error: " + err.message, "error");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Simpan Data";
      });
  });

  function showToast(msg, type) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.style.position = "fixed";
    toast.style.bottom = "-80px"; // start off-screen
    toast.style.right = "20px";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "8px";
    toast.style.fontWeight = "bold";
    toast.style.color = "white";
    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "8px";
    toast.style.transition = "all 0.5s ease";

    // Icon
    const icon = document.createElement("span");
    icon.innerHTML = type === "success" ? "✔️" : "❌";
    toast.prepend(icon);

    // Background
    toast.style.background = type === "success" ? "#4CAF50" : "#f44336";

    document.body.appendChild(toast);

    // Trigger slide-in
    setTimeout(() => {
      toast.style.bottom = "20px";
      toast.style.opacity = "1";
    }, 10);

    // Fade out after 3.5s
    setTimeout(() => {
      toast.style.bottom = "-80px";
      toast.style.opacity = "0";
    }, 3500);

    // Remove from DOM
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
});