/* ========== Products Slider =========== */
const swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 70,
  pagination: {
    el: ".custom-pagination",
    clickable: true,
  },
  breakpoints: {
    567: { slidesPerView: 2, },
    996: { slidesPerView: 3, },
    1200: { slidesPerView: 4, },
  }
})
/* ========== Fetch the Products =========== */
const getProducts = async () => {
  try {
    const results = await fetch("/data.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};
const ProductsWrapper = document.getElementById("products");

window.addEventListener("DOMContentLoaded", async function () {
  let products = await getProducts();
  products = products.filter((product) => product.category === "fragancias");
  displayProductItems(products);
  // loadData();
});

/* ========== Display Products collection=========== */
const displayProductItems = (items) => {
  let displayProduct = items.map(
    (product) => `
                   <div class="swiper-slide">
                <div class="product">
                  <div class="top">
                    <img src=${product.url} alt="" />
                    <div class="icon">
                      <i class="bx bxs-heart"></i>
                    </div>
                  </div>
                  <div class="bottom">
                    <h4>${product.title}</h4>
                    <div class="info-center">
                      <div class="price">$${product.price}</div>
                      <div class="rating">
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    `
  );

  displayProduct = displayProduct.join("");
  ProductsWrapper.innerHTML = displayProduct;
};

/* ========== Filter Products =========== */
const filters = [...document.querySelectorAll('.btn-filter')];
filters.forEach((filter) => {
  filters[2].classList.add('active');
  filter.addEventListener('click', async (e) => {
    const id = e.target.getAttribute('data-filter');
    const target = e.target;
    const products = await getProducts();
    filters.forEach((btn) => {
      btn.classList.remove('active');
    });
    target.classList.add('active');

    let menuCategory = products.filter((product) => {
      if (product.category === id) {
        return product;
      }
    });

    displayProductItems(menuCategory);
    swiper.update();
  });
});


