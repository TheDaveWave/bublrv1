
function FountainsListItem({fountain}) {
    return (
        <div>
            <img src={fountain.picture} className='info-img' alt='A drinking fountain'/>
            <div>
                <p>Rating: {fountain.rating}</p>
            </div>
            <div>
                <button>Go</button>
                <button>Reviews</button>
                <button>Rate</button>
            </div>
        </div>
    );
}

export default FountainsListItem;