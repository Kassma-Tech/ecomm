import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Rating = ({ rating }) => {
    return (
        <Wrapper>
            {
                Array.from({ length: 5 }, (_, x) => {
                    x++
                    return <span key={x}> {rating >= x ? <BsStarFill /> : rating >= (x - 0.5) ? <BsStarHalf /> : <BsStar />}</span>
                })
            }
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #034528;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  margin-bottom: 0.5rem;
  `
export default Rating;


// import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
// const Stars = ({ stars, reviews }) => {
//   const tempStars = Array.from({ length: 5 }, (_, index) => {
//     const number = index + 0.5
//     return (
//       <span key={index}>
//         {stars > number ? (
//           <BsStarFill />
//         ) : stars > index ? (
//           <BsStarHalf />
//         ) : (
//           <BsStar />
//         )}
//       </span>
//     )
//   })