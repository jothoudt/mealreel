import {Link,useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

function EachRecipe(props){

  const dispatch=useDispatch();
  const history=useHistory();

      let recipedetails= '/recipedetails/' + props.recipe.id;
    return(
        <>
        <div key={props.id}>
          <p>{props.recipe.name}</p>
          <div>
          <Link to={recipedetails} params={props.recipe.id}>
          <img src={props.recipe.thumbnail_url} height="250" width="180"></img>
          </Link>
          </div>
        </div>
        </>
    )
}

export default EachRecipe;