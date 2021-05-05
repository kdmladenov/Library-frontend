import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Timeline.css';
import { BASE_URL, readingPoints } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import Loading from '../UI/Loading';
import BookCardRating from '../UI/BookCardRating';

const Timeline = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [userEvents, setUserEvents] = useState([]);
  const [totalReadingPoints, setTotalReadingPoints] = useState(0);
  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}/users/timeline`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw new Error(res.message);
        }
        setLoading(false);
        setUserEvents(res);
        const points = res.find(e => e.event === 'registration').id.split('_')[1];
        setTotalReadingPoints(points);
      })
      .catch(() => history.push('/notFound'));
  }, []);

  if (loading) {
    return (
      <div>
        <Loading>
          <h1>Loading books...</h1>
        </Loading>
      </div>
    );
  }

  const createTimelineElement = (e) => {
    if (e.event === 'review') {
      const points = readingPoints.POST_REVIEW;
      return (
        <VerticalTimelineElement
          key={e.id}
          className="vertical-timeline-element--review"
          contentStyle={{ background: '#466d61', color: '#fff', border: '1px solid #fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #fff' }}
          iconStyle={{ background: '#466d61', color: '#fff' }}
          icon={points > 0 ? `+${points}` : `${points}`}
        >
          <img className="book-cover" src={`${BASE_URL}/${e.front_cover}`} alt="front cover" />
          <div className="timeline-element-info">
            <h3 className="vertical-timeline-element-event">REVIEW</h3>
            <h5 className="vertical-timeline-element-title">{e.title}</h5>
            <h6 className="vertical-timeline-element-subtitle">{e.author}</h6>
            <BookCardRating bookRating={e.bookRating || 0} />
          </div>
        </VerticalTimelineElement>
      );
    }

    if (e.event === 'read' && e.date) {
      const points = e.overdue < 0 ? readingPoints.RETURN_ON_TIME : Math.ceil(readingPoints.RETURN_ON_TIME + e.overdue * readingPoints.RETURN_LATE_MULTIPLIER);
      return (
        <VerticalTimelineElement
          key={e.id}
          className="vertical-timeline-element--read"
          contentStyle={{ background: '#012915', color: '#fff', border: '1px solid #fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #fff' }}
          iconStyle={{ background: '#012915', color: '#fff' }}
          icon={points > 0 ? `+${points}` : `${points}`}
        >
          <img className="book-cover" src={`${BASE_URL}/${e.front_cover}`} alt="front cover" />
          <div className="timeline-element-info">
            <h3 className="vertical-timeline-element-event">READ</h3>
            <h5 className="vertical-timeline-element-title">{e.title}</h5>
            <h6 className="vertical-timeline-element-subtitle">{e.author}</h6>
            <BookCardRating bookRating={e.bookRating || 0} />
          </div>
        </VerticalTimelineElement>
      );
    }

    if (e.event === 'ban') {
      const points = e.banDuration * readingPoints.GET_BANNED_MULTIPLIER;
      return (
        <VerticalTimelineElement
          key={e.id}
          className="vertical-timeline-element--ban"
          contentStyle={{ background: '#670202', color: '#fff', border: '1px solid #fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #fff' }}
          iconStyle={{ background: '#670202', color: '#fff' }}
          icon={points > 0 ? `+${points}` : `${points}`}
        >
          <img className="ban-image" src={`${BASE_URL}/storage/icons/banned.png`} alt="front cover" />
          <div className="timeline-element-info">
            <h5 className="vertical-timeline-element-title">{`Reason: ${e.banDescription}`}</h5>
          </div>
        </VerticalTimelineElement>
      );
    }
  };

  console.log(totalReadingPoints);
  return (
    <VerticalTimeline
      // layout="2-columns"
      layout="1-column-left"
    >
      <VerticalTimelineElement
        className="vertical-timeline-element--points"
        contentStyle={{ background: 'transparent', color: '#fff', border: '1px solid #fff' }}
        contentArrowStyle={{ borderRight: '7px solid  #fff' }}
        iconStyle={{ background: '#466d61', color: '#fff' }}
        icon={totalReadingPoints}
      >
        <h4>Total Reading Points Earned</h4>
      </VerticalTimelineElement>
      {userEvents.map(e => createTimelineElement(e))}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        // icon={<StarIcon />}
      />
    </VerticalTimeline>
  );
};

export default Timeline;
