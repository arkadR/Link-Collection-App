import { Dispatcher } from "flux";
import Action from "./Action";

const dispatcher = new Dispatcher<Action>();

export default dispatcher;
