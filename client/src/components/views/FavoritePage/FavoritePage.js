import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './favorite.css'
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

	const [Favorites, setFavorites] = useState([])

	useEffect(() => {
        fetchFavoredMovie()
	})

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('uesrId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites)
                } else {
                    alert('영화 정보를 가져오는데 실패했습니다.')
                }
            }) 
    }

    const onClickRemove = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('목록에서 삭제하는데 실패했습니다.')
                }
            })
    }

	const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no Image"}
            </div>
        )

		return <tr key={index}>
			<Popover content={content} title={`${favorite.movieTitle}`}>
				<td>{favorite.movieTitle}</td>
			</Popover>
			<td>{favorite.movieRunTime} mins</td>
			<td><button onClick={() => onClickRemove(favorite.movieId, favorite.userFrom)}>Remove</button></td>
		</tr>
	})

    return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<h2> Favorite Movies </h2>
			<hr/> 

			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>RunTime</th>
						<td>Remove from favorite</td>
					</tr>
				</thead>
				<tbody>
                    {renderCards}
				</tbody>
			</table>
		</div>
    )
}

export default FavoritePage