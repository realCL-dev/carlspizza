import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/past')({
  component: Past,
})

export default function Past() {

}