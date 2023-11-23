const storedItemDataString = localStorage.getItem('cartItem');
const storedData = JSON.parse(storedItemDataString);
console.log(storedData);

 const detallesComprasUl = document.querySelector('.detalles-formulario');
const li1 = document.createElement('li');
const li2 = document.createElement('li');
const li3 = document.createElement('li');
const li4 = document.createElement('li');
const li5 = document.createElement('li');
const li6 = document.createElement('li');

// Asignar valores de texto a cada li
li1.textContent = `Nombre: ${storedData.formData.username}`;
li2.textContent = `Correo Electrónico: ${storedData.formData.email}`;
li3.textContent = `Teléfono: ${storedData.formData.phone}`;
li4.textContent = `Dirección: ${storedData.formData.address}`;
li5.textContent = `Referencia: ${storedData.formData.reference}`;
li6.textContent = `Tipo de Pago: ${storedData.formData.typePay}`;
    
// Agregar los elementos li al ul
detallesComprasUl.appendChild(li1);
detallesComprasUl.appendChild(li2);
detallesComprasUl.appendChild(li3);
detallesComprasUl.appendChild(li4);
detallesComprasUl.appendChild(li5);
detallesComprasUl.appendChild(li6);

const detallesComprasUl2 = document.querySelector('.detalles-compras');

const liPrecio = document.createElement('li');
liPrecio.textContent = `Total a pagar:s./ ${storedData.totalValue}`;
storedData.itemsArray.map(item => {
    const li = document.createElement('li');
  li.textContent = `${item.itemName} - Unidades: ${item.itemQty}`;
  detallesComprasUl2.appendChild(li);
});

detallesComprasUl2.appendChild(liPrecio);

const close = document.getElementById("close-localstorage");

close.addEventListener("click", () => {
    localStorage.clear();
});


    // storedData.map((item) => {
    //     // Crear un nuevo elemento li
    //     const li = document.createElement('li');

    //     // Agregar el contenido del elemento li (puedes personalizar esto según tus necesidades)
    //     li.textContent = `${item.itemName} - ${item.itemQty} x ${item.itemPrice}`;

    //     // Agregar el li a la ul
    //     detallesComprasUl.appendChild(li);
    // });