import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, edit } from '../../../store/slices/reminderSlice';
import { getWeatherData, useImage } from '../../../utils';
import Popup from '../../Popup';
import StyledViewSetReminder from './SetReminder.styles';




const SetReminder = ({ date, title, weather, togglePopup, time, type }) => {
    const dispatch = useDispatch();
    const reminders = useSelector((state) => state.reminders);
    const [viewType, setViewType] = useState(type);
    const pinIcon = useImage('pin-icon.png');

    let currReminder;
    if (reminders[date]) currReminder = reminders[date][time]

    const [inputs, setInputs] = useState({
        date,
        weather: currReminder?.weather || weather,
        city: currReminder?.city || '',
        time: currReminder?.time || '',
         newTime: currReminder?.time || '',
        description: currReminder?.description || ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'time') {
            if (reminders[date]) currReminder = reminders[date][value]

            const weatherValue = currReminder?.weather;
            const cityValue = currReminder?.city;
            const descriptionValue = currReminder?.description;
            const inputObj = {}

            if (weatherValue) inputObj.weather = weatherValue
            if (cityValue) inputObj.city = cityValue
            if (descriptionValue) inputObj.description = descriptionValue

            return setInputs(values => ({
                ...values,
                ...inputObj,
                [name]: value
            }))
        }
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const weatherValue = await getWeatherData(inputs.date, inputs.time, inputs.city);
        setInputs({ ...inputs, weather: weatherValue });

        if (type === 'create') {
            dispatch(add({ ...inputs, weather: weatherValue }));
        } else {
            dispatch(edit({ ...inputs, weather: weatherValue }));
        }

        togglePopup();
    }

    const image = useImage(`${inputs.weather?.icon}.png`)

    if (viewType === 'view') return (
        <Popup handleClose={togglePopup}>

            <StyledViewSetReminder>
                <div>

                    <h1>{title}</h1>

                </div>
                {inputs.weather &&
                    <img
                        src={image}
                        alt={inputs.weather?.conditions}
                        title={inputs.weather?.conditions}
                        style={{ width: '2rem' }}
                    />}
                <div
                    style={{ textTransform: 'capitalize' }}>
                    {inputs.city}
                    <img
                        src={pinIcon}
                        alt='Location icon'
                        title='Location'
                        style={{ width: '0.5rem', marginLeft: '0.2rem' }}
                    />
                </div>
                <h2 title='Remember time'>{inputs.time}</h2>
                <div>
                    <p
                        className='view-fields'>
                        <span style={{ fontWeight: 600 }}>Event: </span>
                        {inputs.description}
                    </p>
                </div>
                <div >
                    <button
                        className='buttons'
                        onClick={() => {
                            dispatch(remove({ date, time }))
                            togglePopup()
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className='buttons'
                        onClick={() => setViewType('edit')}
                    >
                        Edit
                    </button>
                </div>
            </StyledViewSetReminder>
        </Popup>
    )
    return (<Popup handleClose={togglePopup}>
        <form onSubmit={handleSubmit}>

            <h1>Remider - {title}</h1>
            <div className='field-container' >
                <label htmlFor='time'>
                    Time
                </label>
                <input
                    type='time'
                    id='time'
                    name={type !== 'create' ? 'newTime' : 'time'}
                    onChange={handleChange}
                    required
                    value={ type !== 'create' && inputs.newTime ? inputs.newTime : inputs.time }
                />
            </div>
            <div className='field-container'>
                <div>
                    <div className='field-container' >
                        <label htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            type='text'
                            maxLength='30'
                            id='description'
                            name='description'
                            style={{ width: '100%', height: '3rem' }}
                            onChange={handleChange}
                            required
                            value={inputs.description}
                        />
                    </div>
                </div>
                <div className='field-container'>
                    <label htmlFor='city'>
                        City
                    </label>
                    <input
                        type='text'
                        id='city'
                        name='city'
                        style={{ width: '50%', textAlign: 'center' }}
                        onChange={handleChange}
                        required
                        value={inputs.city}
                    />
                </div>
            </div>
            {currReminder && <button
                className='buttons'
                onClick={() => { setViewType('view') }}
            >
                View
            </button>}
            <button
                className='buttons'
                type='submit'
            >
                Save
            </button>
        </form>

    </Popup>)
}

export default SetReminder