import { useEffect, useState } from "react"
import { GiHummingbird } from "react-icons/gi";
import { BsEgg } from "react-icons/bs";
import { INotificationDisplay } from "../Modals/NotificationMedels";
import { NotificationList } from "../Constants/Objects/NotificationList";
import { Tooltip } from "react-bootstrap";
import ElementFrame from "../Constants/Objects/ElementFrame";
import { colors } from "../Constants/Patterns";

const NotificationAlert =({ NoteList }: { NoteList: INotificationDisplay[] }) => {
const [open, setOpen] = useState(false)
const [active, setActive] = useState(false)

useEffect(()=>{
let active = 0;
NoteList.forEach((note) => {
    if (!note.seen) { 
      active += 1;
    }
  });
  if (active>0)
  setActive(true);
},[]);

const toggleList = () =>{
    setOpen((prev)=> !prev)
}


return (
    <>
    <div>
    <button onClick={toggleList} className={`${open && colors.ActiveText}`}>
        <Tooltip title="Notifications">
        {active? (<GiHummingbird className="animate-bounce" size={30}/>):(<BsEgg size={24} className="pt-1"/>)}
        </Tooltip>
    </button>
    </div>
    {open &&
    <ElementFrame overflowY="auto" overflowX="hidden" height="500px" tailwind="absolute z-50 right-2">
        <NotificationList NoteList={NoteList} />
    </ElementFrame>}
    </>
)

}

export {NotificationAlert}