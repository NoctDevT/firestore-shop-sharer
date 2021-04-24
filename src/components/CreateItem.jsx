import React,{useState} from "react";
import * as db from "../firestore";
import Error from "./shared/Error";

function CreateItem({user, listId}) {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  const [submitting, setSubmitting] = useState(false)

  async function handleCreateItem(event) {
    try {
    event.preventDefault();
    setSubmitting(true)
    const item = {name, link};
    await db.createListItem({user, listId, item});
    setName('');
    setLink('');
    }catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleCreateItem} className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0">
        <input
          className="flex-grow w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-green-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0"
          name="name"
          placeholder="Add item name"
          onChange={e => setName(e.target.value)}
          type="text"
          value={name}
        />
        <input
          className="flex-grow w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-green-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0"
          name="link"
          placeholder="Add link"
          type="url"
          onChange={e => setLink(e.target.value)}
          value={link}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
        >
          {submitting ? "creating..." : "create"}
        </button>
      </form>
      <Error  message={error}/>
    </>
  );
}

export default CreateItem;
