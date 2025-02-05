import { Share2, MessageSquare, ClipboardCopyIcon, CheckIcon, Heart } from 'lucide-react'
import React, { FormEvent, useState } from 'react'
import Post from '#social/models/post'
import { Card } from '#common/ui/components/card'
import { Button, buttonVariants } from '#common/ui/components/button'
import Room from '#social/models/room'
import { cn } from '#common/ui/lib/utils'
import { Link } from '@inertiajs/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#common/ui/components/dropdown-menu'
import { useToast } from '#common/ui/hooks/use_toast'
import useTranslate from '#common/ui/hooks/use_translate'
import { PostActions } from './post_actions'

interface PostCardProps {
  header?: React.ReactElement
  room: Room
  post: Post
}

export function PostCard({ header, post }: PostCardProps) {
  const [likesCount, setLikesCount] = useState(post.likesCount)
  const [userLikes, setUserLikes] = useState(post.likes?.length > 0 || false)
  const t = useTranslate('social')
  const { toast } = useToast()

  const handleCopyLink = (e: FormEvent) => {
    navigator.clipboard.writeText(`https://panache.so/rooms/${post.roomId}/posts/${post.id}`)
    toast({
      description: (
        <div className="flex items-center space-x-2">
          <CheckIcon className="text-emerald-700 h-4 w-4" />
          <span>{t('link_copied')}</span>
        </div>
      ),
    })
    e.stopPropagation()
  }

  const handleClickLike = async (e: FormEvent) => {
    e.preventDefault()

    if (userLikes) {
      /**
       * Handle dislike.
       */
      await fetch(`/rooms/${post.roomId}/posts/${post.id}/unlike`, {
        method: 'POST',
        credentials: 'include',
      })
      setLikesCount((likesCount) => likesCount - 1)
      setUserLikes(false)
    } else {
      /**
       * Handle like.
       */
      await fetch(`/rooms/${post.roomId}/posts/${post.id}/like`, {
        method: 'POST',
        credentials: 'include',
      })
      setLikesCount((likesCount) => likesCount + 1)
      setUserLikes(true)
      e.stopPropagation()
    }
  }

  return (
    <Link href={`/rooms/${post.roomId}/posts/${post.id}`}>
      <Card className="hover:bg-accent transition-colors">
        <div className="p-4">
          {header}

          {/* Content */}
          <div className="pt-2">
            <h2 className="font-medium mb-2">{post.title}</h2>
            {/* {post.link && (
            <a
              href={post.link}
              className="text-blue-600 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.link.length > 60 ? `${post.link.slice(0, 60)}...` : post.link}
            </a>
          )} */}
          </div>

          {/* Image */}
          {post.image && (
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={post.image || '/placeholder.svg'}
                alt={post.title}
                className="object-cover"
              />
            </div>
          )}

          <PostActions post={post} />
        </div>
      </Card>
    </Link>
  )
}
