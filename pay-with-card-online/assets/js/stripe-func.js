const checkoutButton = document.getElementById("checkout");



checkoutButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const personalDataContainer = document.getElementById('personalData');
    const inputElements = personalDataContainer.querySelectorAll('input');
    
    const formData = {};
    
    inputElements.forEach((input) => {
      const inputName = input.getAttribute('name');
      const inputValue = input.value;
      formData[inputName] = inputValue;
    });

    const itemList = document.getElementById("itemList");
    const cartItems = Array.from(itemList.children);
    const totalValueElement = document.querySelector(".totalValue");
    const totalValue = parseFloat(totalValueElement.innerText.replace(/[^\d.]/g, ''));


    const itemsArray = cartItems.map((cartItem) => {
        const itemName = cartItem.querySelector('.order-list-details h4').innerText.trim();
        const itemSize = cartItem.querySelector('.order-list-details small').innerText.trim();
        const itemQty = parseInt(cartItem.querySelector('.qty').value, 10);
        const itemPrice = parseFloat(cartItem.querySelector('.order-list-price').innerText.replace(/[^\d.]/g, ''), 10);


        return {
            itemName,
            itemSize,
            itemQty,
            itemPrice,
        };
    });
const requestBody = {
    itemsArray,
    totalValue,
    formData
};
formValidate()

    const res = await fetch("https://serverdq-production.up.railway.app/api/v1/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });


    if (!res.ok) {
        console.error("Error en la solicitud:", res.status, res.statusText);
        // Puedes agregar más detalles del error si es necesario.
    } else {
        const data = await res.json();
         window.location.href = data.init_point;
    }

});




function formValidate() {

    var name = $('#userNameOnlinePayment').parsley();
    var phone = $('#phoneOnlinePayment').parsley();
    var email = $('#emailOnlinePayment').parsley();
    var address = $('#addressOnlinePayment').parsley();
    var message = $('#messageOnlinePayment').parsley();
    var terms = $('#cbxOnlinePayment').parsley();

    if (!name.isValid() || !phone.isValid() || !email.isValid() || !address.isValid() || !message.isValid() || !terms.isValid()) {
        return false;
    }
    return true;

}
