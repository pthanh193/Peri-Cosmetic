import React, {useState} from 'react'

const Search = ({history}) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else{
            history.push('/')
        }

    }

    return (
        <form onSubmit={searchHandler} style={{marginTop: "15px", borderRadius: "3px"}}>
            <div className="inputSearch">
                <input 
                    type="text" 
                    placeholder="Nhập tên sản phẩm..."
                    onChange={(e)=> setKeyword(e.target.value)}
                />
                
                {/* <div className="input-group-appened" > */}
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                {/* </div> */}
            </div>
        </form>
    )
}

export default Search