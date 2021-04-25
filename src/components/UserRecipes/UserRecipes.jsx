import {Link} from 'react-router-dom';

function UserRecipes(){
    return(
        <>
        <h1>User Recipes</h1>
        <div className="add-a-recipe">
            <Link to="/useraddrecipe">
              <button>Add A Recipe</button>
            </Link>
        </div>
        </>
    )
}

export default UserRecipes;