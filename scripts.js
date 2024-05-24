document.addEventListener("DOMContentLoaded", () => {
    const productInput = document.getElementById("product-name");
    const addProductBtn = document.getElementById("create-btn");
    const priceInput = document.getElementById("price");
    const imageURL = document.getElementById("imageURL");
    const productList = document.getElementById("product-list");
    const errorMessage = document.getElementById("errorMessage");
    

    let dashboard = [];

    addProductBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const productText = productInput.value.trim();
        const productPrice = priceInput.value.trim();
        const productImage = imageURL.value.trim();


        if (!isImgUrl(productImage)) {            
            errorMessage.innerHTML = `<p class="errorMessage">Please enter a valid image URL.</p>`;  
            return;          
        }

        const productObject = {
            id: Date.now(),
            text: productText, 
            price: productPrice,
            image: productImage  
        };

        dashboard.push(productObject);
        renderDashboard(dashboard);

        productInput.value = "";
        priceInput.value = "";
        imageURL.value = "";
        
    });

    function renderDashboard(dashboardToRender) {
        productList.innerHTML = "";
        dashboardToRender.forEach((productObject) => {
            const dashboardAdd = document.createElement("li");
            dashboardAdd.className = "flex justify-between items-center bg-gray-200 px-4 py-2 mb-2 rounded text-pretty hover:ring-1 hover:ring-violet-700 hover:ring-offset-2";
            dashboardAdd.innerHTML = "";

            const productCard = document.createElement("div");
            productCard.className = "flex items-center";
            productCard.innerHTML = `
                <img src="${productObject.image}" class="w-16 h-16 mr-4">
                <div>
                    <h3 class="text-xl font-semibold">${productObject.text}</h3>
                    <p class="text-gray-600">${productObject.price}</p>                    
                </div>
            `;

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            dashboardAdd.appendChild(checkBox);
            dashboardAdd.appendChild(productCard);

            productList.appendChild(dashboardAdd);


        });
    }
});

/* function toggleLike(event) {
	const checkbox = event.target;
	const uploadId = parseInt(checkbox.getAttribute("data-id"));
	const upload = ip.find((upload) => upload.id === uploadId);

	if (upload) {
		upload.likes = checkbox.checked;
		updateLikeCounter();
	}
} */









function isImgUrl(images) {
    const input = new URL(images);
    return /\.(jpg|jpeg|gif|png)$/.test(input.pathname);
}

