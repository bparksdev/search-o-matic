import React, {useState, useEffect} from 'react'

const STORAGE_KEY = 'myList'

const readList = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch(e) { return [] }
}

const writeList = (list) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) } catch(e){}
}

export default function SaveButton({show, movie}){
    const [saved, setSaved] = useState(false)
    const item = movie ? {type:'movie', id: movie.id, title: movie.title, poster_path: movie.poster_path} : {type:'tv', id: show.id, title: show.name, poster_path: show.poster_path}

    useEffect(()=>{
        const list = readList()
        const found = list.find(i=> i.type === item.type && i.id === item.id)
        setSaved(!!found)
    }, [item.id])

    const toggle = () => {
        const list = readList()
        if (saved) {
            const next = list.filter(i=> !(i.type === item.type && i.id === item.id))
            writeList(next)
            setSaved(false)
        } else {
            list.push(item)
            writeList(list)
            setSaved(true)
        }
    }

    return <button type="button" className="button" onClick={toggle} style={{marginLeft:8}}>{saved ? 'Saved' : 'Save'}</button>
}
