import './Allergens.scss';
import React from 'react';

const Allergens = props => {

    const allergen = props.post.allergens

    return (
        <div className="allergens-content">
            <div className="allergen-info">
                {allergen.nuts === "yes" ? <li><p>Nuts<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.fish === "yes" ? <li><p>Fish<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.celery === "yes" ? <li><p>Celery<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.milk === "yes" ? <li><p>Milk<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.crustaceans === "yes" ? <li><p>Crustaceans<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.mustard === "yes" ? <li><p>Mustard<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.peanuts === "yes" ? <li><p>Peanuts<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.soya === "yes" ? <li><p>Soya<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.wheat === "yes" ? <li><p>Wheat<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.eggs === "yes" ? <li><p>Eggs<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.lupin === "yes" ? <li><p>Lupin<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.mollus === "yes" ? <li><p>Mollus<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.sesame === "yes" ? <li><p>Sesame<span className="tick"> &#10004;</span></p></li> : "" }
                {allergen.sulphur === "yes" ? <li><p>Sulphur<span className="tick"> &#10004;</span></p></li> : "" }
            </div>

            <div className="allergen-info">
                {allergen.nuts === "no" ? <li><p>Nuts<span className="cross"> ✗</span></p></li> : "" }
                {allergen.fish === "no" ? <li><p>Fish<span className="cross"> ✗</span></p></li> : "" }
                {allergen.celery === "no" ? <li><p>Celery<span className="cross"> ✗</span></p></li> : "" }
                {allergen.milk === "no" ? <li><p>Milk<span className="cross"> ✗</span></p></li> : "" }
                {allergen.crustaceans === "no" ? <li><p>Crustaceans<span className="cross"> ✗</span></p></li> : "" }
                {allergen.mustard === "no" ? <li><p>Mustard<span className="cross"> ✗</span></p></li> : "" }
                {allergen.peanuts === "no" ? <li><p>Peanuts<span className="cross"> ✗</span></p></li> : "" }
                {allergen.soya === "no" ? <li><p>Soya<span className="cross"> ✗</span></p></li> : "" }
                {allergen.wheat === "no" ? <li><p>Wheat<span className="cross"> ✗</span></p></li> : "" }
                {allergen.eggs === "no" ? <li><p>Eggs<span className="cross"> ✗</span></p></li> : "" }
                {allergen.lupin === "no" ? <li><p>Lupin<span className="cross"> ✗</span></p></li> : "" }
                {allergen.mollus === "no" ? <li><p>Mollus<span className="cross"> ✗</span></p></li> : "" }
                {allergen.sesame === "no" ? <li><p>Sesame<span className="cross"> ✗</span></p></li> : "" }
                {allergen.sulphur === "no" ? <li><p>Sulphur<span className="cross"> ✗</span></p></li> : "" }
            </div>
        </div>
    )
}

export default Allergens
