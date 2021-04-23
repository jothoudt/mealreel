import './RandomRecipe.css'

//function to call to 3rd party api for recipes
const nextRecipe=()=>{
    console.log('try different recipe')
}

function RandomRecipe(){
    return(
        <div className="recipe-random">
          <div>
            <h1>Random Recipe</h1>
          </div>
          <div className="random-recipe-section">
              <h5>hi</h5>
              {/* {<img src=""} */}
          </div>
          <div>
              <button onClick={nextRecipe}>Try Again</button>
          </div>
        </div>
    )
}

export default RandomRecipe;