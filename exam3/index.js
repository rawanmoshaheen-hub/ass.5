const API = "https://nutriplan-api.vercel.app/api";

class NutriPlanAPI {

  async request(url, options = {}) {

    const response = await fetch(url, options);

    const data = await response
      .json()
      .catch(() => ({}));

    if (!response.ok) {

      throw new Error(
        data.message ||
        `Request failed: ${response.status}`
      );

    }

    return data;
  }



  async meals({
    q = "",
    category = "",
    area = "",
    limit = 25
  } = {}) {

    const params = new URLSearchParams();

    params.set("limit", limit);


    if (q) {
      params.set("q", q);
    }


    if (category) {
      params.set("category", category);
    }


    if (area) {
      params.set("area", area);
    }


    const endpoint =
      category || area
        ? "/meals/filter"
        : "/meals/search";


    const data = await this.request(
      `${API}${endpoint}?${params}`
    );


    return data.results || [];
  }


  async categories() {

    const data = await this.request(
      `${API}/meals/categories`
    );

    return data.results || [];
  }


  

  async areas() {

    const data = await this.request(
      `${API}/meals/areas`
    );

    return data.results || [];
  }


  

  async meal(id) {

    const data = await this.request(
      `${API}/meals/${id}`
    );

    return data.result;
  }

  async products(query) {

    const data = await this.request(
      `${API}/products/search?q=${encodeURIComponent(query)}&limit=24`
    );

    return data.results || [];
  }



  async barcode(code) {

    const data = await this.request(
      `${API}/products/barcode/${encodeURIComponent(code)}`
    );

    return data.result;
  }




  async nutrition(title, ingredients) {

    const apiKey =
      "blENUaoJVaHoHJpPP8rI2bQPa1B2pSHJ8vLUrru3";


    const data = await this.request(
      `${API}/nutrition/analyze`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },

        body: JSON.stringify({
          recipeName: title,
          ingredients: ingredients
        })
      }
    );


    return data.data || {};
  }

}


class FoodLog {

  constructor() {

    this.goals = {

      calories: 2000,

      protein: 120,

      carbs: 250,

      fat: 70

    };


    this.today = this.dateKey();


    this.key =
      `nutriplan-log-${this.today}`;


    this.data = this.load();

  }




  dateKey(date = new Date()) {

    return date
      .toISOString()
      .slice(0, 10);

  }




  load() {

    const saved =
      localStorage.getItem(this.key);


    if (saved) {

      return JSON.parse(saved);

    }


    return {

      meals: [],

      totals: {

        calories: 0,

        protein: 0,

        carbs: 0,

        fat: 0

      }

    };

  }



  save() {

    localStorage.setItem(
      this.key,
      JSON.stringify(this.data)
    );

  }



  add(item) {

    const newItem = {

      ...item,

      loggedAt:
        new Date().toISOString(),

      id:
        `${Date.now()}-${Math.random()}`

    };


    this.data.meals.push(newItem);


    const nutrition =
      item.nutrition || {};


    this.data.totals.calories +=
      Number(nutrition.calories || 0);


    this.data.totals.protein +=
      Number(nutrition.protein || 0);


    this.data.totals.carbs +=
      Number(nutrition.carbs || 0);


    this.data.totals.fat +=
      Number(nutrition.fat || 0);


    this.save();

  }



  remove(id) {

    const item =
      this.data.meals.find(
        meal => meal.id === id
      );


    if (!item) return;


    const nutrition =
      item.nutrition || {};


    this.data.totals.calories -=
      Number(nutrition.calories || 0);


    this.data.totals.protein -=
      Number(nutrition.protein || 0);


    this.data.totals.carbs -=
      Number(nutrition.carbs || 0);


    this.data.totals.fat -=
      Number(nutrition.fat || 0);


    this.data.meals =
      this.data.meals.filter(
        meal => meal.id !== id
      );


    this.save();

  }


  clear() {

    this.data = {

      meals: [],

      totals: {

        calories: 0,

        protein: 0,

        carbs: 0,

        fat: 0

      }

    };


    this.save();

  }

}



class App {

  constructor() {

    this.api =
      new NutriPlanAPI();


    this.log =
      new FoodLog();


    this.meals = [];


    this.layout = "grid";


    this.currentMeal = null;


    this.bindEvents();


    this.init();

  }



  $(selector) {

    return document.querySelector(selector);

  }


  $$(selector) {

    return [
      ...document.querySelectorAll(selector)
    ];

  }



  bindEvents() {


  

    this.$("#mealSearch")
      .addEventListener(
        "input",
        this.debounce(
          () => {

            this.searchMeals(
              this.$("#mealSearch").value
            );

          },
          450
        )
      );



    this.$("#gridView").onclick = () => {

      this.layout = "grid";

      this.$("#gridView")
        .classList
        .add("active");


      this.$("#listView")
        .classList
        .remove("active");


      this.renderMeals();

    };


   

    this.$("#listView").onclick = () => {

      this.layout = "list";

      this.$("#listView")
        .classList
        .add("active");


      this.$("#gridView")
        .classList
        .remove("active");


      this.renderMeals();

    };



    this.$("#showAllCategories").onclick =
      () => {

        this.loadMeals({});

      };



    this.$("#backHome").onclick =
      () => {

        this.go("#home");

      };



    this.$("#productSearchBtn").onclick =
      () => {

        this.searchProducts(
          this.$("#productSearch").value
        );

      };


    this.$("#productSearch")
      .addEventListener(
        "keydown",
        event => {

          if (event.key === "Enter") {

            this.searchProducts(
              event.target.value
            );

          }

        }
      );



    this.$("#barcodeBtn").onclick =
      () => {

        this.searchBarcode(
          this.$("#barcodeInput").value
        );

      };


    this.$("#barcodeInput")
      .addEventListener(
        "keydown",
        event => {

          if (event.key === "Enter") {

            this.searchBarcode(
              event.target.value
            );

          }

        }
      );


    this.$("#clearLog").onclick =
      () => {

        const answer =
          confirm(
            "Clear all today's logged food?"
          );


        if (answer) {

          this.log.clear();

          this.renderLog();

          this.toast(
            "Food log cleared"
          );

        }

      };


  

    this.$("#menuBtn").onclick =
      () => {

        this.$("#sidebar")
          .classList
          .toggle("open");

      };


    

    this.$$(".nav-link")
      .forEach(link => {

        link.onclick = () => {

          this.$("#sidebar")
            .classList
            .remove("open");

        };

      });


 

    window.addEventListener(
      "hashchange",
      () => {

        this.route();

      }
    );



    this.$("#mealsGrid")
      .addEventListener(
        "click",
        event => {

          const card =
            event.target.closest(
              ".meal-card"
            );


          if (card) {

            this.openMeal(
              card.dataset.id
            );

          }

        }
      );


    

    this.$("#productsGrid")
      .addEventListener(
        "click",
        event => {

          const button =
            event.target.closest(
              ".add-product"
            );


          if (!button) return;


          const product =
            JSON.parse(
              decodeURIComponent(
                button.dataset.product
              )
            );


          this.addProduct(product);

        }
      );


    

    this.$("#loggedMeals")
      .addEventListener(
        "click",
        event => {

          const button =
            event.target.closest(
              ".delete-btn"
            );


          if (!button) return;


          this.log.remove(
            button.dataset.id
          );


          this.renderLog();


          this.toast(
            "Removed from Food Log"
          );

        }
      );

  }


  async init() {

    try {

      await Promise.all([

        this.loadAreas(),

        this.loadCategories()

      ]);

    }
    catch (error) {

      this.toast(
        "Could not load filters."
      );

    }


    this.route();


    await this.loadMeals({});

  }


  route() {

    const hash =
      location.hash || "#home";


    const [
      route,
      query
    ] =
      hash
        .replace("#", "")
        .split("?");


    

    this.$$(".page")
      .forEach(page => {

        page.classList.add(
          "hidden"
        );

      });


   

    this.$$(".nav-link")
      .forEach(link => {

        link.classList.toggle(
          "active",
          link.dataset.route === route
        );

      });


   

    if (route === "scanner") {

      this.$("#scannerPage")
        .classList
        .remove("hidden");

      return;

    }


    

    if (route === "foodlog") {

      this.$("#foodlogPage")
        .classList
        .remove("hidden");


      this.renderLog();


      return;

    }



    if (
      route === "meals" &&
      query
    ) {

      this.$("#detailsPage")
        .classList
        .remove("hidden");


      const id =
        new URLSearchParams(query)
          .get("id");


      if (id) {

        this.openMeal(
          id,
          false
        );

      }


      return;

    }


    /* HOME */

    this.$("#homePage")
      .classList
      .remove("hidden");

  }



  go(hash) {

    location.hash = hash;

  }



  showLoading(value) {

    this.$("#loading")
      .classList
      .toggle(
        "hidden",
        !value
      );

  }


  toast(message) {

    const element =
      this.$("#toast");


    element.textContent =
      message;


    element.classList.add(
      "show"
    );


    clearTimeout(
      this.toastTimer
    );


    this.toastTimer =
      setTimeout(
        () => {

          element.classList.remove(
            "show"
          );

        },
        2600
      );

  }

  debounce(functionToRun, delay) {

    let timer;


    return (...args) => {

      clearTimeout(timer);


      timer =
        setTimeout(
          () => {

            functionToRun(...args);

          },
          delay
        );

    };

  }


  async loadAreas() {

    const areas =
      await this.api.areas();


    const list = [

      {
        name: "All Cuisines"
      },

      ...areas.slice(0, 10)

    ];


    this.$("#areas").innerHTML =
      list
        .map(
          (area, index) => {

            return `
              <button
                class="filter-chip ${
                  index === 0
                    ? "active"
                    : ""
                }"
                data-area="${this.escape(
                  area.name
                )}"
              >
                ${this.escape(
                  area.name
                )}
              </button>
            `;

          }
        )
        .join("");


    this.$("#areas")
      .onclick = event => {

        const button =
          event.target.closest(
            ".filter-chip"
          );


        if (!button) return;


        this.$$(".filter-chip")
          .forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );


        button.classList.add(
          "active"
        );


        const area =
          button.dataset.area ===
          "All Cuisines"
            ? ""
            : button.dataset.area;


        this.loadMeals({
          area
        });

      };

  }


  async loadCategories() {

    const categories =
      await this.api.categories();


    const icons = [

      "fa-drumstick-bite",

      "fa-kitchen-set",

      "fa-cake-candles",

      "fa-cow",

      "fa-bowl-food",

      "fa-bacon",

      "fa-fish",

      "fa-carrot",

      "fa-utensils",

      "fa-leaf",

      "fa-seedling",

      "fa-bowl-rice"

    ];


    const colors = [

      "#ef4444",

      "#f97316",

      "#db2777",

      "#d97706",

      "#475569",

      "#b45309",

      "#0284c7",

      "#16a34a",

      "#0f766e",

      "#16a34a",

      "#65a30d",

      "#a16207"

    ];


    this.$("#categories").innerHTML =

      categories
        .map(
          (category, index) => {

            return `

              <button
                class="category-btn"
                data-category="${this.escape(
                  category.name
                )}"
              >

                <span
                  class="category-icon"
                  style="
                    background:
                    ${colors[
                      index %
                      colors.length
                    ]}
                  "
                >

                  <i
                    class="
                      fa-solid
                      ${
                        icons[
                          index %
                          icons.length
                        ]
                      }
                    "
                  ></i>

                </span>

                ${this.escape(
                  category.name
                )}

              </button>

            `;

          }
        )
        .join("");


    this.$("#categories")
      .onclick = event => {

        const button =
          event.target.closest(
            ".category-btn"
          );


        if (!button) return;


        this.$$(".category-btn")
          .forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );


        button.classList.add(
          "active"
        );


        this.loadMeals({

          category:
            button.dataset.category

        });

      };

  }

  async loadMeals(filters = {}) {

    this.showLoading(true);


    try {

      this.meals =
        await this.api.meals(
          filters
        );


      this.renderMeals();

    }
    catch (error) {

      console.error(error);


      this.toast(
        "Failed to load meals"
      );

    }
    finally {

      this.showLoading(false);

    }

  }



  async searchMeals(query) {

    await this.loadMeals({

      q: query

    });

  }


  renderMeals() {

    this.$("#mealCount")
      .textContent =
      `Showing ${this.meals.length} recipes`;


    const grid =
      this.$("#mealsGrid");


    grid.classList.toggle(
      "list",
      this.layout === "list"
    );


    if (!this.meals.length) {

      grid.innerHTML = `

        <div
          class="
            text-center
            py-16
            text-slate-400
          "
        >

          <i
            class="
              fa-solid
              fa-bowl-food
              text-4xl
              mb-3
            "
          ></i>

          <p>
            No recipes found
          </p>

        </div>

      `;

      return;

    }


    grid.innerHTML =

      this.meals
        .map(meal => {

          return `

            <article
              class="meal-card"
              data-id="${meal.id}"
            >

              <img
                class="meal-img"
                src="${this.safeUrl(
                  meal.thumbnail
                )}"
                alt="${this.escape(
                  meal.name
                )}"
                loading="lazy"
              />


              <div class="meal-body">

                <h4 class="meal-title">
                  ${this.escape(
                    meal.name
                  )}
                </h4>


                <div class="meal-meta">

                  <span class="pill">
                    ${this.escape(
                      meal.category ||
                      "Recipe"
                    )}
                  </span>


                  <span class="pill blue">
                    ${this.escape(
                      meal.area ||
                      "Global"
                    )}
                  </span>

                </div>

              </div>

            </article>

          `;

        })
        .join("");

  }



  async openMeal(
    id,
    changeHash = true
  ) {

    this.showLoading(true);


    try {

      const raw =
        await this.api.meal(id);


      const meal =
        Array.isArray(raw)
          ? raw[0]
          : raw;


      this.currentMeal =
        meal;


      if (changeHash) {

        location.hash =
          `#meals?id=${encodeURIComponent(
            id
          )}`;

      }


      await this.renderDetails(
        meal
      );


      this.$$(".page")
        .forEach(page => {

          page.classList.add(
            "hidden"
          );

        });


      this.$("#detailsPage")
        .classList
        .remove("hidden");


      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
    catch (error) {

      console.error(error);


      this.toast(
        "Could not load meal details"
      );

    }
    finally {

      this.showLoading(false);

    }

  }


  async renderDetails(meal) {

    const ingredients =
      (meal.ingredients || [])
        .map(
          item => item.ingredient
        )
        .filter(Boolean);


    let nutrition = {

      calories: 0,

      protein: 0,

      carbs: 0,

      fat: 0,

      fiber: 0,

      sugar: 0

    };


    try {

      const result =
        await this.api.nutrition(
          meal.name,
          ingredients
        );


      const values =
        result.perServing ||
        result.totals ||
        {};


      nutrition = {

        calories:
          Number(
            values.calories || 0
          ),

        protein:
          Number(
            values.protein || 0
          ),

        carbs:
          Number(
            values.carbs || 0
          ),

        fat:
          Number(
            values.fat || 0
          ),

        fiber:
          Number(
            values.fiber || 0
          ),

        sugar:
          Number(
            values.sugar || 0
          )

      };

    }
    catch (error) {

      console.log(
        "Nutrition unavailable"
      );

    }


    meal._nutrition =
      nutrition;


    const youtube =
      this.youtubeEmbed(
        meal.youtube
      );


    this.$("#detailsContent")
      .innerHTML = `

      <!-- HERO -->

      <div class="detail-hero">

        <img
          src="${this.safeUrl(
            meal.thumbnail
          )}"
          alt="${this.escape(
            meal.name
          )}"
        />


        <div class="detail-overlay">

          <div>

            <div class="meal-meta mb-3">

              <span class="pill">

                ${this.escape(
                  meal.category || ""
                )}

              </span>


              <span class="pill blue">

                ${this.escape(
                  meal.area || ""
                )}

              </span>

            </div>


            <h1
              class="
                text-3xl
                md:text-4xl
                font-extrabold
              "
            >

              ${this.escape(
                meal.name
              )}

            </h1>

          </div>

        </div>

      </div>


      <!-- CONTENT -->

      <div class="detail-layout">


        <!-- LEFT -->

        <div class="space-y-5">


          <!-- INGREDIENTS -->

          <div class="white-card">

            <h2
              class="
                font-extrabold
                text-xl
                mb-4
              "
            >

              <i
                class="
                  fa-solid
                  fa-list-check
                  text-emerald-600
                  mr-2
                "
              ></i>

              Ingredients

            </h2>


            <div class="ingredient-grid">

              ${
                (meal.ingredients || [])
                  .map(item => {

                    return `

                      <div class="ingredient">

                        <b>
                          ${this.escape(
                            item.measure || ""
                          )}
                        </b>

                        ${this.escape(
                          item.ingredient || ""
                        )}

                      </div>

                    `;

                  })
                  .join("")
              }

            </div>

          </div>


          <!-- INSTRUCTIONS -->

          <div class="white-card">

            <h2
              class="
                font-extrabold
                text-xl
                mb-3
              "
            >

              <i
                class="
                  fa-solid
                  fa-list-ol
                  text-emerald-600
                  mr-2
                "
              ></i>

              Instructions

            </h2>


            ${
              (meal.instructions || [])
                .map(
                  (step, index) => {

                    return `

                      <div class="instruction">

                        <span class="step">
                          ${index + 1}
                        </span>


                        <p
                          class="
                            text-sm
                            leading-6
                            text-slate-600
                          "
                        >

                          ${this.escape(
                            step
                          )}

                        </p>

                      </div>

                    `;

                  }
                )
                .join("")
            }

          </div>


          <!-- VIDEO -->

          <div class="white-card">

            <h2
              class="
                font-extrabold
                text-xl
                mb-4
              "
            >

              <i
                class="
                  fa-brands
                  fa-youtube
                  text-red-500
                  mr-2
                "
              ></i>

              Video Tutorial

            </h2>


            ${
              youtube

                ? `

                  <div class="video-wrap">

                    <iframe
                      src="${youtube}"
                      allowfullscreen
                    ></iframe>

                  </div>

                `

                : `

                  <div
                    class="
                      p-10
                      text-center
                      bg-slate-50
                      rounded-xl
                      text-slate-400
                    "
                  >

                    No video tutorial available.

                  </div>

                `
            }

          </div>

        </div>


        <!-- RIGHT -->

        <aside
          class="
            white-card
            nutrition-sticky
          "
        >

          <h2
            class="
              font-extrabold
              text-xl
              mb-4
            "
          >

            <i
              class="
                fa-solid
                fa-chart-pie
                text-emerald-600
                mr-2
              "
            ></i>

            Nutrition Facts

          </h2>


          <p
            class="
              text-xs
              text-slate-400
              mb-4
            "
          >
            Per serving
          </p>


          ${this.nutritionBar(
            "Calories",
            nutrition.calories,
            700,
            "bg-emerald-500",
            " kcal"
          )}


          ${this.nutritionBar(
            "Protein",
            nutrition.protein,
            50,
            "bg-blue-500",
            " g"
          )}


          ${this.nutritionBar(
            "Carbs",
            nutrition.carbs,
            80,
            "bg-amber-500",
            " g"
          )}


          ${this.nutritionBar(
            "Fat",
            nutrition.fat,
            30,
            "bg-purple-500",
            " g"
          )}


          ${this.nutritionBar(
            "Fiber",
            nutrition.fiber,
            30,
            "bg-orange-500",
            " g"
          )}


          <button
            id="logMeal"
            class="log-btn"
          >

            <i
              class="
                fa-solid
                fa-clipboard-list
                mr-2
              "
            ></i>

            Log This Meal

          </button>

        </aside>

      </div>

    `;



    this.$("#logMeal").onclick =
      () => {

        this.log.add({

          type: "meal",

          name: meal.name,

          category:
            meal.category ||
            "Meal",

          image:
            meal.thumbnail,

          nutrition:
            nutrition

        });


        this.toast(
          `${meal.name} added to Food Log`
        );

      };

  }


  nutritionBar(
    label,
    value,
    max,
    color,
    unit
  ) {

    const percentage =
      Math.min(
        (Number(value) / max) * 100,
        100
      );


    return `

      <div class="nutrition-row">

        <div class="nutrition-label">

          <span>
            ${label}
          </span>

          <span>
            ${this.num(value)}
            ${unit}
          </span>

        </div>


        <div class="bar">

          <span
            class="${color}"
            style="
              width:
              ${percentage}%
            "
          ></span>

        </div>

      </div>

    `;

  }


  async searchProducts(query) {

    if (!query.trim()) {

      this.toast(
        "Enter a product name first"
      );

      return;

    }


    this.showLoading(true);


    try {

      const products =
        await this.api.products(
          query.trim()
        );


      this.renderProducts(
        products
      );

    }
    catch (error) {

      console.error(error);


      this.toast(
        "Product search failed"
      );

    }
    finally {

      this.showLoading(false);

    }

  }


  async searchBarcode(code) {

    if (!code.trim()) {

      this.toast(
        "Enter a barcode first"
      );

      return;

    }


    this.showLoading(true);


    try {

      const product =
        await this.api.barcode(
          code.trim()
        );


      this.renderProducts([
        product
      ]);

    }
    catch (error) {

      console.error(error);


      this.toast(
        "Product not found for this barcode"
      );

    }
    finally {

      this.showLoading(false);

    }

  }


  renderProducts(products) {

    const validProducts =
      products.filter(
        product =>

          product &&

          product.name &&

          product.name !==
            "Unknown Product" &&

          product.name !==
            "Unknown"
      );


    this.$("#productCount")
      .textContent =
      `${validProducts.length} products found`;


    if (!validProducts.length) {

      this.$("#productsGrid")
        .innerHTML = `

          <div
            class="
              text-center
              py-16
              text-slate-400
            "
          >

            No products found.

          </div>

        `;

      return;

    }


    this.$("#productsGrid")
      .innerHTML =

      validProducts
        .slice(0, 12)
        .map(product => {

          const nutrition =
            this.productNutrition(
              product
            );


          const productData = {

            name:
              product.name,

            category:
              "Product",

            image:
              product.image ||
              product.image_url ||
              "",

            nutrition:
              nutrition

          };


          return `

            <article
              class="product-card"
            >

              <img
                src="${this.safeUrl(
                  productData.image
                )}"
                alt="${this.escape(
                  product.name
                )}"
                onerror="
                  this.style.display='none'
                "
              />


              <h4>
                ${this.escape(
                  product.name
                )}
              </h4>


              <div
                class="
                  text-xs
                  text-slate-400
                  mb-2
                "
              >

                Barcode:

                ${this.escape(
                  product.barcode ||
                  "N/A"
                )}

              </div>


              <div
                class="
                  product-nutrition
                "
              >

                <span>

                  ${this.num(
                    nutrition.calories
                  )}

                  kcal

                </span>


                <span>

                  ${this.num(
                    nutrition.protein
                  )}

                  g P

                </span>


                <span>

                  ${this.num(
                    nutrition.carbs
                  )}

                  g C

                </span>

              </div>


              <button
                class="add-product"

                data-product="${encodeURIComponent(
                  JSON.stringify(
                    productData
                  )
                )}"
              >

                <i
                  class="
                    fa-solid
                    fa-plus
                    mr-1
                  "
                ></i>

                Add to Food Log

              </button>

            </article>

          `;

        })
        .join("");

  }

  productNutrition(product) {

    const nutrition =
      product.nutrition ||
      product.nutrients ||
      {};


    return {

      calories:
        Number(
          nutrition.calories ??
          product.calories ??
          product.energy_kcal ??
          0
        ),


      protein:
        Number(
          nutrition.protein ??
          product.protein ??
          0
        ),


      carbs:
        Number(
          nutrition.carbs ??
          product.carbs ??
          product.carbohydrates ??
          0
        ),


      fat:
        Number(
          nutrition.fat ??
          product.fat ??
          0
        )

    };

  }


  addProduct(product) {

    this.log.add(product);


    this.toast(
      `${product.name} added to Food Log`
    );

  }

  renderLog() {

    const totals =
      this.log.data.totals;


    const goals =
      this.log.goals;


    /* DATE */

    this.$("#logDate")
      .textContent =

      new Date()
        .toLocaleDateString(
          "en-US",
          {
            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric"
          }
        );



    const config = [

      [
        "calories",
        "Calories",
        "kcal",
        "bg-emerald-500"
      ],

      [
        "protein",
        "Protein",
        "g",
        "bg-blue-500"
      ],

      [
        "carbs",
        "Carbohydrates",
        "g",
        "bg-amber-500"
      ],

      [
        "fat",
        "Fats",
        "g",
        "bg-purple-500"
      ]

    ];


    this.$("#goalCards")
      .innerHTML =

      config
        .map(
          ([
            key,
            label,
            unit,
            color
          ]) => {

            const percentage =
              Math.min(
                (
                  totals[key] /
                  goals[key]
                ) * 100,

                100
              );


            return `

              <div class="goal-card">

                <div class="top">

                  <span>
                    ${label}
                  </span>

                  <span>
                    ${this.num(
                      goals[key]
                    )}
                    ${unit}
                    goal
                  </span>

                </div>


                <div class="goal-value">

                  ${this.num(
                    totals[key]
                  )}

                  <small
                    class="
                      text-xs
                      text-slate-400
                      ml-1
                    "
                  >

                    /
                    ${this.num(
                      goals[key]
                    )}
                    ${unit}

                  </small>

                </div>


                <div class="goal-bar">

                  <span
                    class="${color}"
                    style="
                      width:
                      ${percentage}%
                    "
                  ></span>

                </div>


                <p
                  class="
                    text-xs
                    text-slate-400
                    mt-2
                  "
                >

                  ${Math.round(
                    percentage
                  )}%

                  of daily goal

                </p>

              </div>

            `;

          }
        )
        .join("");


    /* LOGGED FOOD */

    if (
      !this.log.data.meals.length
    ) {

      this.$("#loggedMeals")
        .innerHTML = `

          <div
            class="
              py-14
              text-center
              text-slate-400
            "
          >

            <i
              class="
                fa-solid
                fa-clipboard-list
                text-4xl
                mb-3
              "
            ></i>


            <p
              class="font-semibold"
            >

              No food logged today

            </p>


            <p
              class="
                text-sm
                mt-1
              "
            >

              Add meals or products
              to start tracking.

            </p>

          </div>

        `;

      return;

    }


    this.$("#loggedMeals")
      .innerHTML =

      this.log.data.meals
        .map(item => {

          return `

            <div class="log-item">

              <img
                src="${this.safeUrl(
                  item.image ||
                  item.thumbnail ||
                  ""
                )}"
                alt=""
              />


              <div
                class="log-item-main"
              >

                <h4
                  class="
                    font-bold
                    text-sm
                  "
                >

                  ${this.escape(
                    item.name
                  )}

                </h4>


                <p
                  class="
                    text-xs
                    text-slate-400
                  "
                >

                  ${new Date(
                    item.loggedAt
                  ).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",

                      minute: "2-digit"
                    }
                  )}

                  ·

                  ${this.escape(
                    item.category ||
                    "Food"
                  )}

                </p>


                <p
                  class="
                    text-xs
                    mt-1
                    text-slate-500
                  "
                >

                  ${this.num(
                    item.nutrition?.calories
                  )}

                  kcal

                  ·

                  ${this.num(
                    item.nutrition?.protein
                  )}

                  g protein

                  ·

                  ${this.num(
                    item.nutrition?.carbs
                  )}

                  g carbs

                  ·

                  ${this.num(
                    item.nutrition?.fat
                  )}

                  g fat

                </p>

              </div>


              <button
                class="delete-btn"
                data-id="${item.id}"
              >

                <i
                  class="
                    fa-solid
                    fa-xmark
                  "
                ></i>

              </button>

            </div>

          `;

        })
        .join("");

  }


  youtubeEmbed(url) {

    if (!url) return "";


    const match =
      url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/
      );


    if (!match) return "";


    return `https://www.youtube.com/embed/${match[1]}`;

  }



  num(number) {

    return Number(
      number || 0
    )
      .toFixed(1)
      .replace(".0", "");

  }



  escape(value = "") {

    return String(value)
      .replace(
        /[&<>'"]/g,
        character => {

          return {

            "&": "&amp;",

            "<": "&lt;",

            ">": "&gt;",

            "'": "&#39;",

            '"': "&quot;"

          }[character];

        }
      );

  }


  safeUrl(value = "") {

    const url =
      String(value);


    if (
      /^https?:\/\//i
        .test(url)
    ) {

      return url;

    }


    return "https://via.placeholder.com/600x400?text=NutriPlan";

  }

}



new App();