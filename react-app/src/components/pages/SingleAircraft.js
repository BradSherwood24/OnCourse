import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/session';
import { useParams, useHistory } from 'react-router-dom';
import { deleteAircraft } from '../../store/aircraft';
import AircraftForm from '../newAircraft'
import './SingleAircraft.css'

function SingleAircraft() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [aircraft, setAircraft] = useState({});
  const [update, setUpdate] = useState(false)
  const [img, setImg] = useState(0)
  const [newImg, setNewImg] = useState('')
  const [add, setAdd] = useState(false)
  const user = useSelector(state => state.session.user)
  const [images, setImages] = useState([])
  const { Id } = useParams();

  useEffect(() => {
    if (!Id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/aircraft/aircraft/${Id}`);
      const json = await response.json();
      setAircraft(json);
    })();
  }, [Id]);

  if (!aircraft) {
    return null;
  }

  const handleDeleteSubmit = async e => {
    e.preventDefault()
    await dispatch(deleteAircraft(Id))
    history.push('/dashboard')
  }

  const addImg = async e => {
    e.preventDefault()
    if (newImg.length !== 0) {
      const res = await fetch('/api/aircraft/image', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          img_src: newImg,
          aircraft_id: Id
        })
      })
      if (res.ok) {
        history.push(`/aircraft/${Id}`)
      }
    } else {
      console.log(aircraft)
    }
  }

  const imgList = () => {
    aircraft = JSON.parse(aircraft)

    return (
      aircraft.images.map((image) => {
        image = JSON.parse(image)
        return (
          <img key={image.id} src={image.img_src}>
          </img>
        )
      })
    );
  };

  const closeForm = () => {
    setUpdate(false)
  }


  return (
    <div>
      <div className='title'>
        <h1>{aircraft.manufacturer} {aircraft.name}</h1>
        <h2>Price:  ${aircraft.price}/h</h2>
        {user.id === aircraft.user_id &&
          <div className='buttons'>
            <button onClick={handleDeleteSubmit}>
              Delete
            </button>
            <button onClick={e => setUpdate(!update)}>
              Edit
            </button>
            <button onClick={e => setAdd(!add)}>
              Add Images
            </button>
            {update &&
              <AircraftForm aircraft={aircraft} user={user} closeForm={closeForm} />
            }
            {add &&
              <div>
                <form onSubmit={addImg}>
                  <label>image url</label>
                  <input
                    value={newImg}
                    onChange={e => setNewImg(e.target.value)}>
                  </input>
                  <button type='submit'>Add</button>
                </form>
              </div>
            }
          </div>
        }
      </div>
      <div className='Image_div'>
        <img src={aircraft.cover_img} className='Image'></img>
      </div>
      <div className='other_imgs'>
        {imgList}
      </div>
      <div>
        <h3>Description</h3>
        <p>{aircraft.description}</p>
      </div>
    </div>
  );
}
export default SingleAircraft;
