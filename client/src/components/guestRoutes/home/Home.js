import './Home.scss';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Home = () => {

    const bakery = [
        {link: "brownie"            , description: "Brownies"               , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fbrownies.jpg?alt=media&token=c7ad0140-7c7f-4311-8858-e88572357748"   },
        {link: "bread"              , description: "Breads"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fbread.jpg?alt=media&token=ac730fe2-75cb-4f77-b0b8-16d5d61f7774"      },   
        {link: "cake"               , description: "Cakes"                  , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fcake.jpg?alt=media&token=b0708e2e-64df-4ce0-a457-10505d42eefa"       },
        {link: "cookie"             , description: "Cookies"                , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fcookie.jpg?alt=media&token=b9e8fb59-86c8-4dde-96b7-f3d3604575db"     },
        {link: "cupcake"            , description: "Cupcakes"               , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fcupcake.jpg?alt=media&token=c066a0c0-3cea-441a-8da5-df118de65221"    },
        {link: "cakepop"            , description: "Cake-pops"              , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fcakepops.jpg?alt=media&token=6fd21b4e-14d8-40f2-b4ce-500583ebce7a"   },
        {link: "donut"              , description: "Donuts"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fdonut.jpg?alt=media&token=0dea2399-fd99-472f-b872-906c1295f6fe"      },
        {link: "pastry"             , description: "Pastry"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fpastry.jpg?alt=media&token=b47f4763-57a5-4a5c-a923-4315eabb987d"     },
        {link: "pie and tart"       , description: "Pie & Tarts"            , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fpie.jpg?alt=media&token=99256043-5fd6-48d5-86a3-072a78bf0e22"        },
        {link: "dessert"            , description: "Desserts"               , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fdessert.jpg?alt=media&token=247bc23a-3524-4f3a-99f2-b0552e91b866"    },
        {link: "other bakery"       , description: "Others"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fotherbakery.jpg?alt=media&token=cd323ac0-ff24-44c1-81ec-d6c4162856df"},
    ]

    const confection = [
        {link: "fudge"              , description: "Fudge"                  , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Ffudge.jpg?alt=media&token=4fe23cf6-08aa-4c6c-a3c4-ae0629506049"      },   
        {link: "chocolate"          , description: "Chocolate"              , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fchcolate.jpg?alt=media&token=c4c6c107-c82e-4c57-aa10-df5814962003"   },
        {link: "gummies"            , description: "Gummies"                , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fgummies.jpg?alt=media&token=f94df63a-1acb-45d8-8681-a073efc07f04"    },
        {link: "hard candies"       , description: "Hard Candies"           , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fhardcandy.jpg?alt=media&token=0d145477-7d8c-4047-9088-65f85b8aac39"  },
        {link: "licorice"           , description: "Licorice"               , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Flicorice.jpg?alt=media&token=e90c699a-c425-499f-86d7-36e589f39cbd"   },
        {link: "sour"               , description: "Sour"                   , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fsour.jpg?alt=media&token=6c76db1b-e6bb-4571-a72d-29d56af1e363"       },
        {link: "chewing gum"        , description: "Chewing Gum"            , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fchewinggum.jpg?alt=media&token=d61f35ae-52ec-449b-80ea-86b72d7642fa" },
        {link: "other confection"   , description: "Others"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fothercandy.jpg?alt=media&token=c4a296ba-fd9b-4b85-ad23-7919fe30ed06" },
    ]

    const vegetable = [
        {link: "bulb and stem"      , description: "Bulbs & Stems"          , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fbulbs.jpg?alt=media&token=a7111278-c17f-4bf6-afc6-466cfdae1f32"      },
        {link: "leafy and salad"    , description: "Leafy & Salad"          , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fleafy.jpg?alt=media&token=e3bd3af7-8250-43e4-b140-c9f8b493a30b"      },
        {link: "edible flower"      , description: "Edible Flowers"         , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fedflower.jpg?alt=media&token=0fb506a9-5048-4c81-b12f-16ed8f8278b0"   },
        {link: "podded and seed"    , description: "Podded & Seeds"         , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fpoddedseed.jpg?alt=media&token=a021f4a8-14a8-41fd-8981-2e921e4d7bc4" },
        {link: "root and tuberous"  , description: "Roots & Tuberous"       , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Froots.jpg?alt=media&token=db4c8828-15fc-42cb-aad1-4d9b297ae16f"      },
        {link: "sea"                , description: "Sea"                    , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fseaveg.jpg?alt=media&token=19ce0946-872f-48bf-83fa-d212831ff70f"     },
        {link: "other vegetable"    , description: "Others"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fotherveg.jpg?alt=media&token=04549032-7529-4247-917e-91070ff6aa3e"   },
    ]

    const fruit = [
        {link: "berries"            , description: "Berries"                , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fberries.jpg?alt=media&token=97550da7-c6bb-4141-aea3-a128e847f946"    },
        {link: "citrus"             , description: "Citrus"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fcitrus.jpg?alt=media&token=6f9864e2-41c5-4fd7-b6c8-04a57e1f4509"     },
        {link: "drupe"              , description: "Drupe"                  , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fdrupes.jpg?alt=media&token=dd93dcba-a40d-4298-ba68-ba36a20a84f1"     },
        {link: "melon"              , description: "Melons"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fmelon.jpg?alt=media&token=d9244044-c9c9-46ee-8940-7f60c995227e"      },
        {link: "pomes"              , description: "Pomes"                  , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fpomes.jpg?alt=media&token=8d3194d7-a649-437e-8b21-42e1bde08e53"      },
        {link: "tropical"           , description: "Tropical"               , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Ftropical.jpg?alt=media&token=24631e9f-4dee-462e-ba3e-ed2a4c2f2119"   },
        {link: "other fruit"        , description: "Others"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fotherfruit.jpg?alt=media&token=443931b0-ccb1-47a4-b398-dc9739ccd5fd" },
    ]

    const seasoning = [
        {link: "salt and pepper"    , description: "Salt & Pepper"          , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fsalt.jpg?alt=media&token=80aaba52-9a8a-46fa-ad7f-35621545a4a7"       },
        {link: "herb"               , description: "Herbs"                  , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fherb.jpg?alt=media&token=0f3e7603-11f3-4f5c-a6c8-b7d89e2c201d"       },
        {link: "spices"             , description: "Spices"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fspicies.jpg?alt=media&token=9ed5288e-b659-43fe-b8d9-beae3f01bb08"    },
        {link: "asian"              , description: "Asian"                  , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fasian.jpg?alt=media&token=8c7c3c87-13cc-4885-ad60-0838232690c7"      },
        {link: "other seasoning"    , description: "Others"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fotherseasoning.jpg?alt=media&token=294ed99d-b56c-4cc0-bffd-378c0804f37e"},
    ]

    const beverage = [
        {link: "tea"                , description: "Tea"                    , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Ftea.jpg?alt=media&token=8105034b-32b7-4744-b966-2f6cc46980d9"        },
        {link: "coffee"             , description: "Coffee"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fcoffee.jpg?alt=media&token=13e41ff2-eaa5-4cf6-941b-367c8533e0d4"     },
        {link: "juice"              , description: "Juice"                  , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fjuice.jpg?alt=media&token=cb108664-3735-411a-a835-87ea5e5ab461"      },
        {link: "health drink"       , description: "Health Drink"           , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fplantbased.jpg?alt=media&token=0f7d224f-344d-431f-b1f1-6f66ef5ca077" },
        {link: "wine"               , description: "Wine"                   , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fwine.jpg?alt=media&token=063c9276-d9dc-4fe7-b513-0fdb0221cd1d"       },
        {link: "beer"               , description: "Beer"                   , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fbeer.jpg?alt=media&token=2e02d1b8-6197-420a-bdf9-87805d347829"       },
        {link: "other beverage"     , description: "Others"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fotherdrinks.jpg?alt=media&token=f8ad5a0b-8fbe-462e-a1e7-12ff006c6a56"},
    ]

    const meat = [
        {link: "beef"               , description: "Beef"                   , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fmeat.jpg?alt=media&token=fcebfa45-831f-4ef5-98a1-c921a8a330c1"       },
        {link: "poultry"            , description: "Poultry"                , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fpoultry.jpg?alt=media&token=fe003694-523e-4dc1-95ca-2f30f242c307"    },
        {link: "pork"               , description: "Pork"                   , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fpork.jpg?alt=media&token=47de366d-74ea-4c06-8e0c-dd323a82535c"       },
        {link: "lamb"               , description: "Lamb"                   , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Flamb.jpg?alt=media&token=35eb5e3b-306d-4e82-a666-1076b944b072"       },
        {link: "other meat"         , description: "Others"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fothermeat.jpg?alt=media&token=58c1f742-8391-45a1-95c5-b15be520642b"  },
    ]

    const seafood = [
        {link: "fish"               , description: "Fish"                   , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Ffish.jpg?alt=media&token=3b5ab540-96da-438a-b51b-7fd061d36791"       },
        {link: "crustacean"         , description: "Crustacean"             , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fcrustacean.jpg?alt=media&token=b421f613-841f-4a59-9d6d-5094bd5abd96" },
        {link: "shellfish"          , description: "Shellfish"              , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fshellfish.jpg?alt=media&token=1a50595d-b346-4979-aa45-af1b81ef7e4f"  },
        {link: "roe"                , description: "Roe"                    , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Froe.jpg?alt=media&token=29917d61-7fa1-4020-866e-305d4cfb0690"        },
        {link: "other seafood"      , description: "Others"                 , image: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/homepage%2Fotherseafood.jpg?alt=media&token=72525945-3142-4031-9fde-440b331c3fff"},
    ]

    return (
    <div className="home-page-container">
        <div>
            <h2>Bakery</h2>
            <div className="map-images">
            {bakery.map((el, index) => 
                <div className="-images" key={index}><Link to={`/category/${el.link}`}><p>{el.description}</p><img src={el.image} alt="" /></Link></div>
            )}
            </div>

            <h2>Confection</h2>
            <div className="map-images">
            {confection.map((el, index) => 
                <div className="-images" key={index}><Link to={`/category/${el.link}`}><p>{el.description}</p><img src={el.image} alt="" /></Link></div>
            )}
            </div>

            <h2>Vegetable</h2>
            <div className="map-images">
            {vegetable.map((el, index) => 
                <div className="-images" key={index}><Link to={`/category/${el.link}`}><p>{el.description}</p><img src={el.image} alt="" /></Link></div>
            )}
            </div>

            <h2>Fruits</h2>
            <div className="map-images">
            {fruit.map((el, index) => 
                <div className="-images" key={index}><Link to={`/category/${el.link}`}><p>{el.description}</p><img src={el.image} alt="" /></Link></div>
            )}
            </div>

            <h2>Seasoning</h2>
            <div className="map-images">
            {seasoning.map((el, index) => 
                <div className="-images" key={index}><Link to={`/category/${el.link}`}><p>{el.description}</p><img src={el.image} alt="" /></Link></div>
            )}
            </div>

            <h2>Beverage</h2>
            <div className="map-images">
            {beverage.map((el, index) => 
                <div className="-images" key={index}><Link to={`/category/${el.link}`}><p>{el.description}</p><img src={el.image} alt="" /></Link></div>
            )}
            </div>

            <h2>Meat</h2>
            <div className="map-images">
            {meat.map((el, index) => 
                <div className="-images" key={index}><Link to={`/category/${el.link}`}><p>{el.description}</p><img src={el.image} alt="" /></Link></div>
            )}
            </div>

            <h2>Seafood</h2>
            <div className="map-images">
            {seafood.map((el, index) => 
                <div className="-images" key={index}><Link to={`/category/${el.link}`}><p>{el.description}</p><img src={el.image} alt="" /></Link></div>
            )}
            </div>

        </div>

    </div>
    )
}


export default connect(null, {})(Home)
