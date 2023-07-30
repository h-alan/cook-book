import { styled } from "styled-components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

function RestaurantDetails() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('description');

  const fetchDetails = () => {
    const check = localStorage.getItem('restaurants');

    // check if the restaurants JSON exists in storage
    if (check) {
      // search through restaurants to find the one that matches the ID
      setDetails(JSON.parse(check).find((rest) => rest._id === params.name));
    }
    else { // if not then set an empty object
      setDetails({});
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const getStarRating = () => {
    // calculate how many stars needed
    const value = Math.round(details.weighted_rating_value * 2) / 2;
    const stars = Array.from(Array(5).slice(0, value), (_, i) => <FaStar key={i} />);
    if (value % 1 !== 0) // if value is a decimal, add a half star
      stars[Math.floor(value)] = <FaStarHalfAlt key={stars.length} />;

    // add empty stars to fill array
    while (stars.length < 5) {
      var i = stars.length;
      stars.push(<FaRegStar key={i} />);
    }
    return <StarRating>{stars}</StarRating>;
  };

  const formatPhoneNumber = () => {
    const string = String(details.phone_number);
    const cleaned = ('' + string).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  return (
    <DetailWrapper animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {details && details.address ?
        <><div>
          <h1>{details.name}</h1>
          <img src={details.logo_photos} alt="" style={{ height: '15rem', width: '15rem' }} />
          <h3>
            Rating
            {getStarRating()}
          </h3>
          <h3>
            <Open>
              {details.is_open ? 'Open now!' : <span className="red-text">NOT OPEN</span>}
            </Open>
          </h3>

        </div>
          <Info>
            <Button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab("description")}>Description</Button>
            <Button className={activeTab === 'hours' ? 'active' : ''} onClick={() => setActiveTab("hours")}>Hours Open</Button>
            {activeTab === 'description' && (
              <Description>
                <img src={details.food_photos} alt="" />
                <h4>
                  <p>
                    {details.address.street_addr}, {details.address.city}, {details.address.state}, {details.address.zipcode}
                  </p>
                  <p>
                    Phone Number: {formatPhoneNumber()}
                  </p>
                  <p>
                    Allows pickup? {details.pickup_enabled ? <span className="red-text">Yes</span> : 'No'}
                  </p>
                  <p>
                    Has delivery? {details.delivery_enabled ? <span className="red-text">Yes</span> : 'No'}
                  </p>
                </h4>
              </Description>
            )}
            {activeTab === 'hours' && (
              <Hours>
                <h3>
                  <p>
                    Monday:
                  </p>
                  <p>
                    Tuesday:
                  </p>
                  <p>
                    Wednesday:
                  </p>
                  <p>
                    Thursday:
                  </p>
                  <p>
                    Friday:
                  </p>
                  <p>
                    Saturday:
                  </p>
                  <p>
                    Sunday:
                  </p>
                </h3>

                <h3>
                  <p>
                    {details.local_hours.operational.Monday}
                  </p>
                  <p>
                    {details.local_hours.operational.Tuesday}
                  </p>
                  <p>
                    {details.local_hours.operational.Wednesday}
                  </p>
                  <p>
                    {details.local_hours.operational.Thursday}
                  </p>
                  <p>
                    {details.local_hours.operational.Friday}
                  </p>
                  <p>
                    {details.local_hours.operational.Saturday}
                  </p>
                  <p>
                    {details.local_hours.operational.Sunday}
                  </p>
                </h3>
              </Hours>
            )}
          </Info></>
        :
        <div>
          Data not Ready
        </div>
      }
    </DetailWrapper>
  );
}

const DetailWrapper = styled(motion.div)`
  margin-top: 5rem;
  margin-bottom: 5rem;
  justify-content: center;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.7rem;
    line-height: 2rem;
  }
  ul{
    margin-top: 2rem;
  }
`

const Button = styled.button`
  padding: 1rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 5rem;
`

const Description = styled.div`
  padding-top: 2rem;

  h4{
    padding-top: 2rem;

    .red-text{
      color: #f27121;
    }

    p{
      padding-top: 1rem;
    }
  }

  img{
    height: 20rem;
    width: 20rem;
  }
`

const Open = styled.div`
  .red-text{
      color: #e94057;
  }
`

const StarRating = styled.div`
  padding-top: 1rem;

  svg{
    color: #f27121;
    font-size: 3rem;
  }
`

const Hours = styled.div`
  display: flex;

  h3{
    p{
      padding: 1rem;
    }
  }
`

export default RestaurantDetails