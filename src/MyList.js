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
    const [activeTab, setActiveTab] = useState('movie')

    useEffect(() => {
        setItems(readList())
    }, [])

    const remove = (idx) => {
        const next = items.slice()
        next.splice(idx,1)
        setItems(next)
        writeList(next)
    }

    const filterItems = () => {
        return items.filter(item => item.type === activeTab)
    }

    const filteredItems = filterItems()
    const movieCount = items.filter(i => i.type === 'movie').length
    const tvCount = items.filter(i => i.type === 'tv').length
    const personCount = items.filter(i => i.type === 'person').length

    if (!items.length) return <div><h2>Your List is empty</h2><p>Save movies, TV shows, or people to view them here.</p></div>

    return (
        <div>
            <h2>My List ({items.length})</h2>
            
            <div className="tabs" style={{marginTop: '2rem', marginBottom: '2rem'}}>
                <button 
                    className={`tab-button ${activeTab === 'movie' ? 'active' : ''}`}
                    onClick={() => setActiveTab('movie')}
                >
                    Movies ({movieCount})
                </button>
                <button 
                    className={`tab-button ${activeTab === 'tv' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tv')}
                >
                    TV ({tvCount})
                </button>
                <button 
                    className={`tab-button ${activeTab === 'person' ? 'active' : ''}`}
                    onClick={() => setActiveTab('person')}
                >
                    People ({personCount})
                </button>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                {filteredItems.map((it, i) => {
                    const actualIndex = items.indexOf(it);
                    
                    if (it.type === 'person') {
                        return (
                            <div key={`${it.type}-${it.id}`} className="mylist-item">
                                <a href={`/people/${it.name}`} style={{flexShrink: 0}}>
                                    <div 
                                        className="mylist-poster" 
                                        style={{
                                            backgroundImage: it.profile_path ? `url(https://image.tmdb.org/t/p/w185${it.profile_path})` : 'none',
                                            backgroundColor: it.profile_path ? 'transparent' : '#333',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </a>
                                <div className="mylist-info">
                                    <div className="mylist-meta">
                                        <h3 style={{margin:0}}>{it.name}</h3>
                                        <small>{it.known_for_department ? `Known For: ${it.known_for_department}` : 'PERSON'}</small>
                                    </div>
                                    <div className="mylist-actions">
                                        <a className="button button--small" href={`/people/${it.name}`}>View</a>
                                        <button type="button" className="button button--small" onClick={() => remove(actualIndex)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    const year = it.type === 'movie' 
                        ? (it.release_date ? new Date(it.release_date).getFullYear() : '')
                        : (it.first_air_date ? new Date(it.first_air_date).getFullYear() : '');
                    
                    return (
                    <div key={`${it.type}-${it.id}`} className="mylist-item">
                        <a href={it.type === 'movie' ? `/movie/${it.title}/${it.id}` : `/show/${it.title}/${it.id}`} style={{flexShrink: 0}}>
                            <div className="mylist-poster" style={{backgroundImage: it.poster_path ? `url(https://image.tmdb.org/t/p/w185${it.poster_path})` : 'none', cursor: 'pointer'}}/>
                        </a>
                        <div className="mylist-info">
                            <div className="mylist-meta">
                                <h3 style={{margin:0}}>{it.title}</h3>
                                <small>{it.type.toUpperCase()}{year ? ` (${year})` : ''}</small>
                            </div>
                            <div className="mylist-actions">
                                <a className="button button--small" href={it.type === 'movie' ? `/movie/${it.title}/${it.id}` : `/show/${it.title}/${it.id}`}>View</a>
                                <button type="button" className="button button--small" onClick={() => remove(actualIndex)}>Remove</button>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
