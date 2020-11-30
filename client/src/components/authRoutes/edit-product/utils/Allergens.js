import './Allergens.scss';
import React, {useState, useEffect} from 'react'
import {updateAllergens} from '../../../../actions/productActions';
import {connect} from 'react-redux';

const Allergens = (props) => {

    //data we brought in as props from Edit.js
    const edit = props.edit

    const [allergenForm, setAllergenForm] = useState({
        nuts: "", fish: "", celery: "",  crustaceans: "", 
        milk: "", mustard: "", peanuts: "", soya: "", wheat: "", 
        eggs: "",  lupin: "", mollus: "", sesame: "", sulphur: ""
    })

    //deconstruct so we dont have to do allergenForm.nuts instead we can just put... nuts
    const {
        nuts, fish, celery, crustaceans, milk, 
        mustard, peanuts, soya, wheat, eggs, 
        lupin, mollus, sesame, sulphur
    } = allergenForm

    //set the values
    useEffect(() => {
        const allergen = !edit ? "" : edit.allergens
        setAllergenForm({
            nuts: allergen.nuts,
            fish: allergen.fish,
            celery: allergen.celery,
            crustaceans: allergen.crustaceans,
            milk: allergen.milk,
            mustard: allergen.mustard,
            peanuts: allergen.peanuts,
            soya: allergen.soya,
            wheat: allergen.wheat,
            eggs: allergen.eggs,
            lupin: allergen.lupin,
            mollus: allergen.mollus,
            sesame: allergen.sesame,
            sulphur: allergen.sulphur,
        })
    }, [edit, setAllergenForm])

    const updateAllergenForm = (e) => {
        e.preventDefault()
        props.updateAllergens(props.match, allergenForm)
    }

    return (
        <div className="allergen-container">
            <li> {nuts === 'no' ?  
            <button className={nuts === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, nuts: "yes"})}>Nuts</button> 
            : 
            <button className={nuts === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, nuts: "no"})}>Nuts</button>
            }
            </li>

            <li> {fish === 'no' ? 
            <button className={fish === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm( {...allergenForm, fish: "yes"})}>Fish</button> 
            : 
            <button className={fish === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, fish: "no"})}>Fish</button>
            }
            </li>

            <li> {celery === 'no' ? 
            <button className={celery === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, celery: "yes"})}>Celery</button> 
            : 
            <button className={celery === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, celery: "no"})}>Celery</button>
            }
            </li>

            <li> {crustaceans === 'no' ? 
            <button className={crustaceans === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, crustaceans: "yes"})}>Crustaceans</button> 
            : 
            <button className={crustaceans === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, crustaceans: "no"})}>Crustaceans</button>
            }
            </li>

            <li> {milk === 'no' ? 
            <button className={milk === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, milk: "yes"})}>Milk</button> 
            : 
            <button className={milk === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, milk: "no"})}>Milk</button>
            }
            </li>

            <li> {mustard === 'no' ? 
            <button className={mustard === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, mustard: "yes"})}>Mustard</button> 
            : 
            <button className={mustard === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, mustard: "no"})}>Mustard</button>
            }
            </li>

            <li> {peanuts === 'no' ? 
            <button className={peanuts === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, peanuts: "yes"})}>Peanuts</button> 
            : 
            <button className={peanuts === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, peanuts: "no"})}>Peanuts</button>
            }
            </li>

            <li> {soya === 'no' ? 
            <button className={soya === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, soya: "yes"})}>Soya</button> 
            : 
            <button className={soya === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, soya: "no"})}>Soya</button>
            }
            </li>

            <li> {wheat === 'no' ? 
            <button className={wheat === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, wheat: "yes"})}>Wheat</button> 
            : 
            <button className={wheat === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, wheat: "no"})}>Wheat</button>
            }
            </li>

            <li> {eggs === 'no' ? 
            <button className={eggs === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, eggs: "yes"})}>Eggs</button> 
            : 
            <button className={eggs === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, eggs: "no"})}>Eggs</button>
            }
            </li>

            <li> {lupin === 'no' ? 
            <button className={lupin === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, lupin: "yes"})}>Lupin</button> 
            : 
            <button className={lupin === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, lupin: "no"})}>Lupin</button>
            }
            </li>

            <li> {mollus === 'no' ? 
            <button className={mollus === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, mollus: "yes"})}>Mollus</button> 
            : 
            <button className={mollus === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, mollus: "no"})}>Mollus</button>
            }
            </li>

            <li> {sesame === 'no' ? 
            <button className={sesame === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, sesame: "yes"})}>Sesame</button> 
            : 
            <button className={sesame === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, sesame: "no"})}>Sesame</button>
            }
            </li>

            <li> {sulphur === 'no' ? 
            <button className={sulphur === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, sulphur: "yes"})}>Sulphur</button> 
            : 
            <button className={sulphur === "no" ? "no-tick" : "tick"} onClick={() => setAllergenForm({...allergenForm, sulphur: "no"})}>Sulphur</button>
            }
            </li>

            <div className="save-btn">
                <button onClick={(e) => updateAllergenForm(e)}>Save</button>
            </div>
        </div>
    )
}


export default connect(null, {updateAllergens})(Allergens)
