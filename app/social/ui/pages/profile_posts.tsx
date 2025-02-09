import React from 'react'
import { Avatar, AvatarImage } from '#common/ui/components/avatar'
import useTranslate from '#common/ui/hooks/use_translate'
import { PostCard } from '#social/ui/components/post_card'
import SocialLayout from '#social/ui/components/social_layout'
import { Link } from '@inertiajs/react'
import { useFormatDistanceToNow } from '#common/ui/hooks/use_format_distance_to_now'
import { ProfileTabs } from '../components/profile_tabs'
import { ProfileHeader } from '../components/profile_header'
import Profile from '#social/models/profile'

export default function ProfilePosts({ profile }: { profile: Profile }) {
  const t = useTranslate()
  const formatDistanceToNow = useFormatDistanceToNow()

  return (
    <SocialLayout>
      <div className="space-y-8">
        <ProfileHeader profile={profile} />
        <ProfileTabs resource="posts" />

        <div className="gap-y-4 flex flex-col max-w-4xl mx-auto">
          {profile.posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              room={post.room}
              header={
                <div className="flex items-start gap-2">
                  <Link
                    className="hover:opacity-75 transition-opacity"
                    href={`/rooms/${post.roomId}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${post.roomId}?`}
                        alt={post.roomId}
                        width={32}
                        height={32}
                      />
                    </Avatar>
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-[13px]">
                      <Link
                        className="font-medium hover:text-emerald-600 transition-colors"
                        href={`/rooms/${post.roomId}`}
                      >
                        {post.room.name}
                      </Link>
                    </div>

                    <p className="text-muted-foreground text-xs">
                      <span className="text-black font-medium">{profile.username}</span>{' '}
                      {t('social.posted')}{' '}
                      {formatDistanceToNow(post.createdAt as unknown as string)}
                    </p>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </SocialLayout>
  )
}
