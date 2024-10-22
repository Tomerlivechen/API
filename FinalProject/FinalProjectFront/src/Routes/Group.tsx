import { useParams } from "react-router-dom";
import { GroupCreation } from "../Constants/Objects/GroupCreation";

const Group = () => {
const {params}= useParams();

return (
    <>
    <div>
<GroupCreation/>

        </div>
    </>
)

}
export {Group}