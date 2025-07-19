import React from 'react';
import {useState} from 'react';
import Navbar  from '../components/Navbar';
import RatelimitedUI from '../components/RatelimitedUI';
import { useEffect } from 'react';
//import axios from 'axios';
import toast from 'react-hot-toast';
import Notecard from '../components/Notecard';
import api from '../lib/axios';
import NotesNotFound from '../components/NoteNotFound';

const HomePage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchNotes = async ()=>{
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRatelimited(false);
      } catch (error) {
        console.log("Error fetching notes",error);
        console.log(error.response);
        if (error.response?.status === 429){
          setIsRatelimited(true);
        } else {
          toast.error("failed to load Notes?");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  },[]);

  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRatelimited && <RatelimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        {!loading && !isRatelimited && notes.length === 0 && <NotesNotFound />}
        {notes.length > 0 && !isRatelimited &&  (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note)=>(
             <Notecard  key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
        
      </div>
    </div>
  )
}

export default HomePage