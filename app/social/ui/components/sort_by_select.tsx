import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#common/ui/components/select'
import useTranslate from '#common/ui/hooks/use_translate'
import { ArrowDownWideNarrowIcon, ClockIcon } from 'lucide-react'
import usePageProps from '#common/ui/hooks/use_page_props'
import useParams from '#common/ui/hooks/use_params'
import useQuery from '#common/ui/hooks/use_query'

export function SortBySelect() {
  const t = useTranslate('social')
  const query = useQuery()
  const [method, setMethod] = React.useState(query.method || 'popular')
  const [period, setPeriod] = React.useState(query.period || 'day')

  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setLoaded(true)
  }, [])

  React.useEffect(() => {
    if (!loaded) return

    if (method === 'new') {
      window.location.search = `method=new`
    } else {
      window.location.search = `method=${method}&period=${period}`
    }
  }, [method, period])

  return (
    <div className="flex space-x-4 border-b pb-4">
      <Select value={method} onValueChange={(value) => setMethod(value)}>
        <SelectTrigger className="w-auto">
          <div className="flex items-center space-x-2 pr-2">
            <ArrowDownWideNarrowIcon className="h-4 w-4" />
            <SelectValue placeholder="Select a fruit" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('sort_by')}</SelectLabel>
            <SelectItem value="popular">{t('popular')}</SelectItem>
            <SelectItem value="new">{t('new')}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {method === 'popular' && (
        <Select value={period} onValueChange={(value) => setPeriod(value)}>
          <SelectTrigger className="w-auto">
            <div className="flex items-center space-x-2 pr-2">
              <ClockIcon className="h-4 w-4" />
              <SelectValue placeholder="Select a fruit" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t('sort_by')}</SelectLabel>
              <SelectItem value="day">{t('day')}</SelectItem>
              <SelectItem value="week">{t('week')}</SelectItem>
              <SelectItem value="month">{t('month')}</SelectItem>
              <SelectItem value="year">{t('year')}</SelectItem>
              <SelectItem value="all">{t('all')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
