import {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/httpHook"
import {AuthContext} from "../context/AuthContext"
import {LinksList} from "../components/LinksList"


export const LinksPage = () => {
  const {token} = useContext(AuthContext)
  const {loading, request} = useHttp()
  const [links, setLinks] = useState([])

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link`, 'GET', null,
        {Authorization: `Bearer ${token}`})
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  },[fetchLinks])

  if (loading) {
    return <div>загрузка</div>
  }

  return (
    <div>
      {!loading && <LinksList links={links}/>}
    </div>
  )
}