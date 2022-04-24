import StyledReminderLine from './RemiderLine.styles';
import { useImage } from '../../../utils';

const ReminderLine = ({ time, description, weather, onClick }) => {
    const image = useImage(`${weather?.icon}.png`);

    return (
        <StyledReminderLine onClick={onClick}>
            {time} - {description}
            {weather &&
                <img
                    src={image}
                    alt={weather?.conditions}
                    title={weather?.conditions}
                    style={{ width: '1rem', float: 'left' }}
                />}
        </StyledReminderLine>
    )
}

export default ReminderLine;