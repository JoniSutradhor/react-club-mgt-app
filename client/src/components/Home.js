import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMember } from '../redux';
import { connect, useSelector } from 'react-redux';

const initialMembers = {
    totalMember: 0,
}
export const Home = () => {
    // export default function Home() {
    const [memberList, setMemberList] = useState([]);
    const [totalMember, setTotalMember] = useState(initialMembers);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    const numOfMember = useSelector(state => state.totalMember)

    // Load Member Data
    useEffect(() => {
        const getMember = async () => {
            setLoading(true);
            axios.get('http://localhost:3001/members')
                .then((res) => {
                    if (componentMounted) {
                        setMemberList(res.data)
                        // console.log(res.data.length)
                        setTotalMember({ ...initialMembers, totalMember: res.data.length })
                    }
                    return () => {
                        componentMounted = false;
                    }
                })
            setLoading(false);
        }
        getMember();
	  return () => { }
    }, [memberList]);
    // Load Member Data

    const dropMember = (id) => {
        axios.delete(`http://localhost:3001/members/dropMember/${id}`)
    }

    return (
        <>
            <div className='row m-1'>
                <div className="col-md-3 mt-5">
                    <Link to='/create' className="btn btn-outline-dark col-md-12" >Add Member</Link>
                </div>
                <div className='col-md-3 mt-5'>
                    <div className="card pt-1">
                        <h5 className="card-title" align='center'>Total Member : {totalMember.totalMember}</h5>
                    </div>
                </div>
            </div>
            <div className='row mx-auto mt-5'>
                {memberList.map((val, key) => {
                    return (
                        <div className="col-md-3 mb-4" key={val.id}>
                            <div className="card shadow  h-100 p-4" >
                                <img src={val.profilePic} className="card-img-top mb-0" alt="" height='250px' />
                                <div className="card-body">
                                    <h5 className="card-title lead fw-bold text-center">{val.name}</h5>
                                    <h6 className="card-title text-center">{val.email}</h6>
                                    <hr />
                                    <p className="card-title"><span>Cell :</span> {val.cell}</p>
                                    <p className="card-title"><span>Age : </span>{val.age}</p>
                                    <p className="card-title"><span>Gender :</span> {val.gender}</p>
                                    <div className='row'>
                                        <Link to={`/update/${val.id}`} className="btn btn-outline-dark col-md-6" >Update</Link>
                                        <Link to="/" className="btn btn-outline-dark col-md-6" onClick={() => { dropMember(val.id) }}>Drop</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div>
        </>
    )
}



const mapStateToProps = state => {
    return {

    }
}

export const mapDispatchToProps = dispatch => {
    return {
        createMember: () => dispatch(createMember())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
