import './Category.scss';
import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {BiCake} from 'react-icons/bi';
import {FaAppleAlt, FaFish, FaCarrot} from 'react-icons/fa';
import {GiSteak, GiHerbsBundle, GiWoodenCrate, GiFoodTruck, GiMushroomGills, GiWaterBottle, GiChocolateBar} from 'react-icons/gi';

const Category = props => {

    const bakery = [
        {link: "brownie"            , description: "Brownies"               },
        {link: "bread"              , description: "Breads"                 },   
        {link: "cake"               , description: "Cakes"                  },
        {link: "cookie"             , description: "Cookies"                },
        {link: "cupcake"            , description: "Cupcakes"               },
        {link: "cakepop"            , description: "Cake-pops"              },
        {link: "donut"              , description: "Donuts"                 },
        {link: "pastry"             , description: "Pastry"                 },
        {link: "pie and tart"       , description: "Pie & Tarts"            },
        {link: "dessert"            , description: "Desserts"               },
        {link: "other bakery"       , description: "Others"                 },
    ]

    const confection = [
        {link: "fudge"              , description: "Fudge"                  },   
        {link: "chocolate"          , description: "Chocolate"              },
        {link: "gummies"            , description: "Gummies"                },
        {link: "hard candies"       , description: "Hard Candies"           },
        {link: "licorice"           , description: "Licorice"               },
        {link: "sour"               , description: "Sour"                   },
        {link: "chewing gum"        , description: "Chewing Gum"            },
        {link: "other confection"   , description: "Others"                 },
    ]

    const vegetable = [
        {link: "bulb and stem"      , description: "Bulbs & Stems"          },
        {link: "leafy and salad"    , description: "Leafy & Salad"          },
        {link: "edible flower"      , description: "Edile Flowers"          },
        {link: "fruit"              , description: "Fruits"                 },
        {link: "podded and seed"    , description: "Podded & Seeds"         },
        {link: "root and tuberous"  , description: "Roots & Tuberous"       },
        {link: "sea"                , description: "Sea"                    },
        {link: "other vegetable"    , description: "Others"                 },
    ]

    const fruit = [
        {link: "berries"            , description: "Berries"                },
        {link: "citrus"             , description: "Citrus"                 },
        {link: "drupe"              , description: "Drupe"                  },
        {link: "melon"              , description: "Melons"                 },
        {link: "pomes"              , description: "Pomes"                  },
        {link: "tropical"           , description: "Tropical"               },
        {link: "other fruit"        , description: "Others"                 },
    ]

    const seasoning = [
        {link: "salt and pepper"    , description: "Salt & Pepper"          },
        {link: "herb"               , description: "Herbs"                  },
        {link: "spices"             , description: "Spices"                 },
        {link: "asian"              , description: "Asian"                  },
        {link: "other seasoning"    , description: "Others"                 },
    ]

    const beverage = [
        {link: "tea"                , description: "Tea"                    },
        {link: "coffee"             , description: "Coffee"                 },
        {link: "juice"              , description: "Juice"                  },
        {link: "plant based"        , description: "Plant-Based"            },
        {link: "wine"               , description: "Wine"                   },
        {link: "beer"               , description: "Beer"                   },
        {link: "other beverage"     , description: "Others"                 },
    ]

    const meat = [
        {link: "beef"               , description: "Beef"                   },
        {link: "poultry"            , description: "Poultry"                },
        {link: "pork"               , description: "Pork"                   },
        {link: "lamb"               , description: "Lamb"                   },
        {link: "other meat"         , description: "Others"                 },
    ]

    const seafood = [
        {link: "fish"               , description: "Fish"                   },
        {link: "crustaceans"        , description: "Crustacean"             },
        {link: "shellfish"          , description: "Shellfish"              },
        {link: "roe"                , description: "Roe"                    },
        {link: "other seafood"      , description: "Others"                 },
    ]

    const mushroom = [
        {link: "oyster"             , description: "Oyster"                 },
        {link: "portobello"         , description: "Portobello"             },
        {link: "cremini"            , description: "Cremini"                },
        {link: "porcini"            , description: "Porcini"                },
        {link: "chanterelle"        , description: "Chanterelle"            },
        {link: "maitake"            , description: "Maitake"                },
        {link: "button"             , description: "Button"                 },
        {link: "lobster"            , description: "Lobster"                },
        {link: "shiitake"           , description: "Shiitake"               },
        {link: "clamshell"          , description: "Clamshell"              },
        {link: "morel"              , description: "Morel"                  },
        {link: "enoki"              , description: "Enoki"                  },
        {link: "other mushroom"     , description: "Others"                 },
    ]

    const stats_product = [
        {link: "top product"          , description: "Top Product"          },
        {link: "top rating"           , description: "Top Rating"           },
        {link: "most review"          , description: "Most Review"          },

        {link: "trending today"       , description: "Trending Today"       },
        {link: "trending this week"   , description: "Trending This Week"   },
        {link: "trending this month"  , description: "Trending This Month"  },
    ]

    const stats_supplier = [
        {link: "top product"          , description: "Top Product"          },
        {link: "top rating"           , description: "Top Rating"           },
        {link: "most review"          , description: "Most Review"          },

        {link: "trending today"       , description: "Trending Today"       },
        {link: "trending this week"   , description: "Trending This Week"   },
        {link: "trending this month"  , description: "Trending This Month"  },
    ]

    const [category, setCategory] = useState("none")

    return (
        <Fragment>
            {/* Open the Menu or category page*/}
            {props.menu ? 
            <Fragment>
            <div className="category-container">
            <div className="category-open">
                <li><button className={category === "bakery" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("bakery")}><BiCake size="1.5rem"/> Bakery</button></li>
                <li><button className={category === "confection" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("confection")}><GiChocolateBar size="1.5rem"/> Confection</button></li>
                <li><button className={category === "vegetable" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("vegetable")}><FaCarrot size="1.5rem"/> Vegetable</button></li>
                <li><button className={category === "fruit" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("fruit")}><FaAppleAlt size="1.5rem"/> Fruit</button></li>
                <li><button className={category === "seasoning" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("seasoning")}><GiHerbsBundle size="1.5rem"/> Seasoning</button></li>
                <li><button className={category === "mushroom" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("mushroom")}><GiMushroomGills size="1.5rem"/> Mushroom</button></li>
                <li><button className={category === "beverage" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("beverage")}><GiWaterBottle size="1.5rem"/> Beverage</button></li>
                <li><button className={category === "meat" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("meat")}><GiSteak size="1.5rem"/> Meat</button></li>
                <li><button className={category === "seafood" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("seafood")}><FaFish size="1.5rem"/> Seafood</button></li> <br/>
                <li><button className={category === "product" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("product")}><GiFoodTruck size="1.5rem"/> Popular Products</button></li>
                <li><button className={category === "supplier" ? "set-btn-color" : "set-btn-opacity"} onClick={() => setCategory("supplier")}><GiWoodenCrate size="1.5rem"/> Popular Suppliers </button></li>
                
            </div>

            {/* Confection */}
            {category === "confection" ? 
                <div className="category-selection">
                {confection.map((el, index) =><li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Bakery Selection*/}
            {category === "bakery" ? 
                <div className="category-selection">
                {bakery.map((el, index) =><li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Vegetable Selection*/}
            {category === "vegetable" ? 
                <div className="category-selection">
                {vegetable.map((el, index) => <li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Fruit Selection*/}
            {category === "fruit" ? 
                <div className="category-selection">
                {fruit.map((el, index) =><li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Seasoning Selection*/}
            {category === "seasoning" ? 
                <div className="category-selection">
                {seasoning.map((el, index) =><li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Mushroom Selection*/}
            {category === "mushroom" ? 
                <div className="category-selection">
                {mushroom.map((el, index) => <li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Beverage */}
            {category === "beverage" ? 
                <div className="category-selection">
                    {beverage.map((el, index) =><li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Meat Selection*/}
            {category === "meat" ? 
                <div className="category-selection">
                {meat.map((el, index) =><li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Seafood Selection*/}
            {category === "seafood" ? 
                <div className="category-selection">
                {seafood.map((el, index) =><li key={index}><Link to={`/categorys/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Product */}
            {category === "product" ? 
                <div className="category-selection">
                    {stats_product.map((el, index) =><li key={index}><Link to={`/products/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            {/* Supplier */}
            {category === "supplier" ? 
                <div className="category-selection">
                    {stats_supplier.map((el, index) =><li key={index}><Link to={`/suppliers/${el.link}`} onClick={() => props.setMenu(false)}>{el.description}</Link></li>)}
                </div>
            : ""}

            <div className="category-close">
                <button onClick={() => props.setMenu(false)}><AiOutlineCloseCircle size="1.5rem"/></button>
            </div>


            </div>
            </Fragment>
            : ""}   
        </Fragment>

    )
}

export default Category
