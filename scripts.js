document.addEventListener("DOMContentLoaded", () => {
    const productInput = document.getElementById("product-name");
    const addProductBtn = document.getElementById("create-btn");
    const priceInput = document.getElementById("price");
    const imageURL = document.getElementById("imageURL");
    const productList = document.getElementById("product-list");

    
let dashboard = [];

addProductBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const productText = productInput.value.trim();
    const productPrice = priceInput.value.trim();
    const productImage = imageURL.value.trim();

    if (productText && productPrice && productImage ) {
        const cart = {
            id: Date.now(),
            text: productText, 
            price: productPrice,
            image: productImage        
        };
        dashboard.push(cart);
        renderdashboard(dashboard);
        productInput.value = "";
        priceInput.value = "";
        imageURL.value = "";

        console.log(dashboard)
        }
    })



function renderdashboard(dashboardToRender) {
    productList.innerHTML = "";
    dashboardToRender.forEach((cart) => {
        const dashboardAdd = document.createElement("li")
        dashboardAdd.className = 
        "flex justify-between items-center bg-gray-200 px-4 py-2 mb-2 rounded text-pretty hover:ring-1 hover:ring-violet-700 hover:ring-offset-2";
        dashboardAdd.innerHTML = "";

        const productCard = document.createElement("div");
            productCard.className = "flex items-center";
            productCard.innerHTML = `
                <img src="${cart.image}" class="w-16 h-16 mr-4">
                <div>
                    <h3 class="text-xl font-semibold">${cart.text}</h3>
                    <p class="text-gray-600">${cart.price}</p>                    
                </div>
            `;

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            dashboardAdd.appendChild(checkBox);
            dashboardAdd.appendChild(productCard);
                        
        
            const buttonContainer = document.createElement("div");
			buttonContainer.className = "flex space-x-2";


            const addToCartBtn = document.createElement("button");
			addToCartBtn.textContent = "Add to cart";
			addToCartBtn.className =
				"bg-purple-600 text-white py-1 px-4 rounded font-sans font-semibold";
			//editBtn.addEventListener("click", () => editTask(task.id));
			buttonContainer.appendChild(addToCartBtn);

			dashboardAdd.appendChild(buttonContainer);
			
			productList.appendChild(dashboardAdd);
        
        
    });
}      
      

        


    function addToCart(id) {
		dashboard = dashboard.filter((c) => c.id !== id);
		renderdashboard(dashboard);
	}



});
