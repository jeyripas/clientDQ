const checkoutButton = document.getElementById("checkout");

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

checkoutButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const validForm = formValidate()
    console.log(validForm);
    if (validForm) {
        const personalDataContainer = document.getElementById('personalData');
        const inputElements = personalDataContainer.querySelectorAll('input');
        const selectElement = document.getElementById('typePayOnlinePayment');

        const selectedValue = selectElement.value;

        const formData = {};

        inputElements.forEach((input) => {
            const inputName = input.getAttribute('name');
            const inputValue = input.value;
            formData[inputName] = inputValue;
        });

        formData['typePay'] = selectedValue;


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

        // Crear un objeto con los datos
        const itemData = {
            itemsArray,
            totalValue,
            formData,
        };
        const itemDataString = JSON.stringify(itemData);
        localStorage.setItem('cartItem', itemDataString);



        const res = await fetch("https://serverdq-production.up.railway.app/api/v1/create-order2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

            const currentUrl = window.location.href;

            window.location.href = currentUrl + "thank-you.html";
   
    }
    if (!validForm) {
        alert("Verifique bien los datos")
    }
    


});
