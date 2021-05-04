import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import Loading from '../UI/Loading';

const Timeline = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
        // console.log(res);
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

  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        date="2011 - present"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        // icon={<WorkIcon />}
      >
        <h4 className="vertical-timeline-element-title">Creative Director</h4>
        <h5 className="vertical-timeline-element-subtitle">Miami, FL</h5>
        <p>
          Creative Direction, User Experience, Visual Design, Project Management, Team Leading
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2010 - 2011"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        // icon={<WorkIcon />}
      >
        <h4 className="vertical-timeline-element-title">Art Director</h4>
        <h5 className="vertical-timeline-element-subtitle">San Francisco, CA</h5>
        <p>
          Creative Direction, User Experience, Visual Design, SEO, Online Marketing
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2008 - 2010"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        // icon={<WorkIcon />}
      >
        <h4 className="vertical-timeline-element-title">Web Designer</h4>
        <h5 className="vertical-timeline-element-subtitle">Los Angeles, CA</h5>
        <p>
          User Experience, Visual Design
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2006 - 2008"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        // icon={<WorkIcon />}
      >
        <h4 className="vertical-timeline-element-title">Web Designer</h4>
        <h5 className="vertical-timeline-element-subtitle">San Francisco, CA</h5>
        <p>
          User Experience, Visual Design
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="April 2013"
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        // icon={<SchoolIcon />}
      >
        <h4 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h4>
        <h5 className="vertical-timeline-element-subtitle">Online Course</h5>
        <p>
          Strategy, Social Media
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="November 2012"
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        // icon={<SchoolIcon />}
      >
        <h4 className="vertical-timeline-element-title">Agile Development Scrum Master</h4>
        <h5 className="vertical-timeline-element-subtitle">Certification</h5>
        <p>
          Creative Direction, User Experience, Visual Design
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2002 - 2006"
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        // icon={<SchoolIcon />}
      >
        <h4 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h4>
        <h5 className="vertical-timeline-element-subtitle">Bachelor Degree</h5>
        <p>
          Creative Direction, Visual Design
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        // icon={<StarIcon />}
      />
    </VerticalTimeline>
  );
};

export default Timeline;
