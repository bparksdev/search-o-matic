import React, {useState, useEffect} from 'react'

const STORAGE_KEY = 'myList'

const readList = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch (e) {
        return []
    }
}

const writeList = (items) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
        console.error('Failed to save list', e)
    }
}

export default function MyList() {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(readList())
    }, [])

    const remove = (idx) => {
        const next = items.slice()
        next.splice(idx,1)
        setItems(next)
        writeList(next)
    }

    if (!items.length) return <div><h2>Your List is empty</h2><p>Save movies or shows to view them here.</p></div>

    return (
        <div>
            <h2>My List ({items.length})</h2>
            <div className="card-list">
                {items.map((it, i) => (
                    <div key={`${it.type}-${it.id}`} className="card mylist-item">
                        <div className="mylist-poster" style={{backgroundImage: it.poster_path ? `url(https://image.tmdb.org/t/p/w185${it.poster_path})` : 'none'}}/>
                        <div className="mylist-info">
                            <div className="mylist-meta">
                                <h3 style={{margin:0}}>{it.title}</h3>
                                <small style={{color:'#d7d7d7'}}>{it.type.toUpperCase()}</small>
                            </div>
                            <div className="mylist-actions">
                                <a className="button button--small" href={it.type === 'movie' ? `/movie/${it.title}/${it.id}` : `/show/${it.title}/${it.id}`}>View</a>
                                <button type="button" className="button button--small" onClick={() => remove(i)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
