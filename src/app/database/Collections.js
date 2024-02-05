import { firestore as db } from "./DB";

const users = db().collection('users');
const bloodrequests = db().collection('bloodrequests');
const bloodtypes = db().collection('bloodtypes');
const urgentbloodrequests = db().collection('urgentbloodrequests');
const messages_collection = db().collection('messages');
const chats = db().collection('chatheads');

export {
    users, 
    bloodrequests,
    bloodtypes,
    urgentbloodrequests,
    messages_collection,
    chats
}
