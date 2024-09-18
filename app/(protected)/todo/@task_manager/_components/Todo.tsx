import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { INIT_TODO } from './TaskForm'

interface TodoProps {
  todo: typeof INIT_TODO
  isSuccess?: boolean
  onDelete?: (selectedTodo: typeof INIT_TODO) => void
  onSuccess?: (selectedTodo: typeof INIT_TODO) => void
}

export default function Todo({
  todo,
  isSuccess,
  onDelete,
  onSuccess,
}: TodoProps) {
  return (
    <List.Row className="flex animate-fade-in items-center justify-between">
      <Box row className="items-center gap-2">
        <Button
          size="none"
          variant="icon"
          className={cn(
            'size-4 rounded-full border border-zinc-400 text-white hover:text-zinc-400 dark:border-zinc-600 dark:text-white',
            isSuccess ? 'bg-zinc-400 dark:bg-zinc-600' : '',
          )}
          onClick={() => onSuccess!(todo)}
        >
          {isSuccess && (
            <Icon size={12} view={20} className="animate-grow-up">
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </Icon>
          )}
        </Button>

        <Text
          className={cn(
            onDelete && onSuccess ? '' : 'text-zinc-400 dark:text-zinc-600',
          )}
        >
          {todo.name}
        </Text>
      </Box>
      {onDelete ? (
        <Box className="flex gap-2">
          <Button
            size="none"
            variant="icon"
            onClick={() => onDelete!(todo)}
            className="size-4 rounded-full text-red-500 dark:text-red-500"
          >
            <Icon size={20} view={27}>
              <path
                d="M8.31361 17.9346C7.94447 18.3037 7.92689 18.9629 8.3224 19.3408C8.70033 19.7363 9.3683 19.7188 9.73744 19.3496L14.0001 15.0869L18.2628 19.3496C18.6408 19.7275 19.2911 19.7363 19.6691 19.3408C20.0646 18.9629 20.0558 18.3037 19.6779 17.9258L15.4152 13.6631L19.6779 9.40918C20.0558 9.02246 20.0646 8.37207 19.6691 7.99414C19.2911 7.59863 18.6408 7.60742 18.2628 7.98535L14.0001 12.248L9.73744 7.98535C9.3683 7.61621 8.70033 7.59863 8.3224 7.99414C7.92689 8.37207 7.94447 9.03125 8.31361 9.40039L12.5763 13.6631L8.31361 17.9346Z"
                fill="currentColor"
              ></path>
            </Icon>
          </Button>
        </Box>
      ) : null}
    </List.Row>
  )
}
