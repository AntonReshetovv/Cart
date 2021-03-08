const totalPrice = document.querySelector(".total-price__value");
const formatNumber = (value) =>
  value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");

const ACTION = {
  PLUS: "plus",
  MINUS: "minus",
};

const getItemSubTotalPrice = (input) => {
  return Number(input.value) * Number(input.dataset.price);
};

const setTotalPrice = (value) => {
  totalPrice.textContent = formatNumber(value);
  totalPrice.dataset.value = value;
};

const init = () => {
  let totalPriceValue = 0;

  [...document.querySelectorAll(".cart-body__row")].forEach((cartItem) => {
    totalPriceValue += getItemSubTotalPrice(cartItem.querySelector(".input"));
  });

  setTotalPrice(totalPriceValue);
};

const calculateSeparateItem = (cartItem, action) => {
  const input = cartItem.querySelector(".input");

  switch (action) {
    case ACTION.PLUS:
      input.value++;
      setTotalPrice(
        Number(totalPrice.dataset.value) + Number(input.dataset.price)
      );
      break;
    case ACTION.MINUS:
      input.value--;
      setTotalPrice(
        Number(totalPrice.dataset.value) - Number(input.dataset.price)
      );
      break;
  }

  cartItem.querySelector(".subtotal").textContent = `${formatNumber(
    getItemSubTotalPrice(input)
  )} руб`;
};

document.querySelector(".cart").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn--minus")) {
    const input = event.target
      .closest(".cart-body__row")
      .querySelector(".input");

    if (Number(input.value) !== 0) {
      calculateSeparateItem(
        event.target.closest(".cart-body__row"),
        ACTION.MINUS
      );
    }
  }

  if (event.target.classList.contains("btn--plus")) {
    calculateSeparateItem(event.target.closest(".cart-body__row"), ACTION.PLUS);
  }
});

init();
