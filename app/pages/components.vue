<script setup lang="ts">
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  Cloud,
  Copy,
  CreditCard,
  GitBranch,
  HelpCircle,
  Info,
  Loader2,
  Mail,
  Minus,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Star,
} from 'lucide-vue-next'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

// Import all UI components (alphabetically sorted)
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import {
  AnimatedTabs,
  AnimatedTabsContent,
} from '~/components/ui/animated-tabs'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { ArtPlum, Grid, Spotlight } from '~/components/ui/backgrounds'
import { Badge } from '~/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '~/components/ui/button-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import DatepickerJalali from '~/components/ui/datepicker-jalali/DatepickerJalali.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '~/components/ui/hover-card'
import { Input, InputPassword } from '~/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '~/components/ui/input-group'
import { InputOtp } from '~/components/ui/input-otp'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '~/components/ui/item'
import { Kbd, KbdGroup } from '~/components/ui/kbd'
import { Label } from '~/components/ui/label'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import ResponsiveAlertDialog from '~/components/ui/responsive/AlertDialog.vue'
import ResponsiveDialog from '~/components/ui/responsive/Dialog.vue'
import { RestText } from '~/components/ui/rest-text'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Skeleton } from '~/components/ui/skeleton'
import { Switch } from '~/components/ui/switch'
import Textarea from '~/components/ui/textarea/Textarea.vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'

const inputValue = ref('')
const selectedDate = ref()
const selectedColor = ref('#000000')
const jalaliDate = ref()
const dateRange = ref()

// Animated Tabs
const activeTab = ref('tab1')
const tabs = [
  { title: 'Tab 1', value: 'tab1' },
  { title: 'Tab 2', value: 'tab2' },
  { title: 'Tab 3', value: 'tab3' },
]

// Item Examples Data
const people = [
  {
    username: 'shadcn',
    avatar: 'https://github.com/shadcn.png',
    email: 'shadcn@vercel.com',
  },
  {
    username: 'maxleiter',
    avatar: 'https://github.com/maxleiter.png',
    email: 'maxleiter@vercel.com',
  },
  {
    username: 'evilrabbit',
    avatar: 'https://github.com/evilrabbit.png',
    email: 'evilrabbit@vercel.com',
  },
]

const music = [
  {
    title: 'Midnight City Lights',
    artist: 'Neon Dreams',
    album: 'Electric Nights',
    duration: '3:45',
  },
  {
    title: 'Coffee Shop Conversations',
    artist: 'The Morning Brew',
    album: 'Urban Stories',
    duration: '4:05',
  },
  {
    title: 'Digital Rain',
    artist: 'Cyber Symphony',
    album: 'Binary Beats',
    duration: '3:30',
  },
]

const models = [
  {
    name: 'v0-1.5-sm',
    description: 'Everyday tasks and UI generation.',
    image:
      'https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop',
    credit: 'Valeria Reverdo on Unsplash',
  },
  {
    name: 'v0-1.5-lg',
    description: 'Advanced thinking or reasoning.',
    image:
      'https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop',
    credit: 'Michael Oeser on Unsplash',
  },
  {
    name: 'v0-2.0-mini',
    description: 'Open Source model for everyone.',
    image:
      'https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop',
    credit: 'Cherry Laithang on Unsplash',
  },
]

function showToast() {
  toast('Event has been created', {
    description: 'Sunday, December 03, 2023 at 9:00 AM',
    action: {
      label: 'Undo',
      onClick: () => {},
    },
  })
}
</script>

<template>
  <div class="space-y-8 p-8">
    <h1 class="mb-6 text-3xl font-bold">
      UI Components Demo
    </h1>

    <!-- Button Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
        <CardDescription>Different button variants and sizes</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Variants
          </h3>
          <div class="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="destructive">
              Destructive
            </Button>
            <Button variant="outline">
              Outline
            </Button>
            <Button variant="secondary">
              Secondary
            </Button>
            <Button variant="ghost">
              Ghost
            </Button>
            <Button variant="link">
              Link
            </Button>
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Sizes
          </h3>
          <div class="flex flex-wrap items-center gap-2">
            <Button size="sm">
              Small
            </Button>
            <Button size="sm" variant="outline">
              <ArrowUpRight />
            </Button>
            <Button>Default</Button>
            <Button size="icon" variant="outline" aria-label="Submit">
              <ArrowUpRight />
            </Button>
            <Button size="lg">
              Large
            </Button>
            <Button size="icon-lg" variant="outline" aria-label="Submit">
              <ArrowUpRight />
            </Button>
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Icon Sizes
          </h3>
          <div class="flex flex-wrap items-center gap-2">
            <Button size="icon-sm" variant="outline" aria-label="Submit">
              <ArrowUpRight />
            </Button>
            <Button size="icon" variant="outline" aria-label="Submit">
              <ArrowUpRight />
            </Button>
            <Button size="icon-lg" variant="outline" aria-label="Submit">
              <ArrowUpRight />
            </Button>
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            With Icon
          </h3>
          <div class="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <GitBranch /> New Branch
            </Button>
            <Button variant="outline">
              <Mail /> Login with Email
            </Button>
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            States
          </h3>
          <div class="flex flex-wrap gap-2">
            <Button :loading="true">
              Loading
            </Button>
            <Button disabled>
              Disabled
            </Button>
            <Button variant="outline" class="rounded-full" size="icon">
              <ArrowUpRight />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Button Group Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Button Group</CardTitle>
        <CardDescription>
          A container that groups related buttons together
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Horizontal
          </h3>
          <ButtonGroup>
            <Button variant="outline">
              Left
            </Button>
            <Button variant="outline">
              Center
            </Button>
            <Button variant="outline">
              Right
            </Button>
          </ButtonGroup>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Vertical
          </h3>
          <ButtonGroup orientation="vertical">
            <Button variant="outline">
              Top
            </Button>
            <Button variant="outline">
              Middle
            </Button>
            <Button variant="outline">
              Bottom
            </Button>
          </ButtonGroup>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Nested
          </h3>
          <ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" size="icon" aria-label="Go Back">
                <ArrowLeft />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">
                Archive
              </Button>
              <Button variant="outline">
                Report
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">
                Snooze
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Separator
          </h3>
          <ButtonGroup>
            <Button variant="secondary">
              Bold
            </Button>
            <ButtonGroupSeparator />
            <Button variant="secondary">
              Italic
            </Button>
            <ButtonGroupSeparator />
            <Button variant="secondary">
              Underline
            </Button>
          </ButtonGroup>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            With Text
          </h3>
          <ButtonGroup>
            <ButtonGroupText>Price:</ButtonGroupText>
            <Button variant="outline">
              $99.99
            </Button>
          </ButtonGroup>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Split Button
          </h3>
          <ButtonGroup>
            <Button variant="outline">
              Save Changes
            </Button>
            <ButtonGroupSeparator />
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="icon" aria-label="More Options">
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Save and Exit</DropdownMenuItem>
                <DropdownMenuItem>Save as Draft</DropdownMenuItem>
                <DropdownMenuItem>Discard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            With Input
          </h3>
          <ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Minus />
              </Button>
            </ButtonGroup>
            <Input placeholder="Quantity" class="w-20 text-center" />
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </CardContent>
    </Card>

    <!-- Badge Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Badges</CardTitle>
        <CardDescription>Different badge variants</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">
          Secondary
        </Badge>
        <Badge variant="alert">
          Alert
        </Badge>
        <Badge variant="outline">
          Outline
        </Badge>
      </CardContent>
    </Card>

    <!-- Input Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
        <CardDescription>Text input component</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="inputValue"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter password" />
        </div>
        <div class="space-y-2">
          <Label for="password-toggle">Password with Toggle</Label>
          <InputPassword id="password-toggle" placeholder="Enter password" />
        </div>
        <div class="space-y-2">
          <Label for="disabled">Disabled Input</Label>
          <Input id="disabled" disabled placeholder="Disabled input" />
        </div>
        <p class="text-muted-foreground text-sm">
          Current value: {{ inputValue }}
        </p>
      </CardContent>
    </Card>

    <!-- Input Group Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Input Group</CardTitle>
        <CardDescription>
          Display additional information or actions to an input or
          textarea
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Icon
          </h3>
          <div class="grid w-full max-w-sm gap-4">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput type="email" placeholder="Enter your email" />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Card number" />
              <InputGroupAddon>
                <CreditCard />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Check />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Rate this" />
              <InputGroupAddon align="inline-end">
                <Star />
                <Info />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Text
          </h3>
          <div class="grid w-full max-w-sm gap-4">
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="0.00" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="example.com" class="!pl-0.5" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>.com</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Enter your username" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>@company.com</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Button
          </h3>
          <div class="grid w-full max-w-sm gap-4">
            <InputGroup>
              <InputGroupInput placeholder="https://x.com/shadcn" readonly />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Copy" title="Copy" size="icon-xs">
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup class="[--radius:9999px]">
              <Popover>
                <PopoverTrigger as-child>
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <Info />
                    </InputGroupButton>
                  </InputGroupAddon>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  class="flex flex-col gap-1 rounded-xl text-sm"
                >
                  <p class="font-medium">
                    Your connection is not secure.
                  </p>
                  <p>
                    You should not enter any sensitive information on this site.
                  </p>
                </PopoverContent>
              </Popover>
              <InputGroupAddon class="text-muted-foreground pl-1.5">
                https://
              </InputGroupAddon>
              <InputGroupInput />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs">
                  <Star />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Type to search..." />
              <InputGroupAddon align="inline-end">
                <InputGroupButton variant="secondary">
                  Search
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Tooltip
          </h3>
          <div class="grid w-full max-w-sm gap-4">
            <InputGroup>
              <InputGroupInput placeholder="Enter password" type="password" />
              <InputGroupAddon align="inline-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Info"
                        size="icon-xs"
                      >
                        <Info />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Password must be at least 8 characters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Your email address" />
              <InputGroupAddon align="inline-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Help"
                        size="icon-xs"
                      >
                        <HelpCircle />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>We'll use this to send you notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Textarea
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <InputGroup>
              <InputGroupTextarea
                placeholder="console.log('Hello, world!');"
                class="min-h-[200px]"
              />
              <InputGroupAddon align="block-end" class="border-t">
                <InputGroupText>Line 1, Column 1</InputGroupText>
                <InputGroupButton size="sm" class="ml-auto" variant="default">
                  Run
                </InputGroupButton>
              </InputGroupAddon>
              <InputGroupAddon align="block-start" class="border-b">
                <InputGroupText class="font-mono font-medium">
                  script.js
                </InputGroupText>
                <InputGroupButton class="ml-auto" size="icon-xs">
                  <RefreshCw />
                </InputGroupButton>
                <InputGroupButton variant="ghost" size="icon-xs">
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupTextarea placeholder="Enter your message" />
              <InputGroupAddon align="block-end">
                <InputGroupText class="text-muted-foreground text-xs">
                  120 characters left
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Spinner
          </h3>
          <div class="grid w-full max-w-sm gap-4">
            <InputGroup data-disabled>
              <InputGroupInput placeholder="Searching..." disabled />
              <InputGroupAddon align="inline-end">
                <Loader2 class="animate-spin" />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup data-disabled>
              <InputGroupInput placeholder="Processing..." disabled />
              <InputGroupAddon>
                <Loader2 class="animate-spin" />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup data-disabled>
              <InputGroupInput placeholder="Saving changes..." disabled />
              <InputGroupAddon align="inline-end">
                <InputGroupText>Saving...</InputGroupText>
                <Loader2 class="animate-spin" />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Label
          </h3>
          <div class="grid w-full max-w-sm gap-4">
            <InputGroup>
              <InputGroupInput id="username" placeholder="shadcn" />
              <InputGroupAddon>
                <Label for="username">@</Label>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput
                id="user-email"
                placeholder="shadcn@vercel.com"
              />
              <InputGroupAddon align="block-start">
                <Label for="user-email" class="text-foreground"> Email </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Help"
                        class="ml-auto rounded-full"
                        size="icon-xs"
                      >
                        <Info />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>We'll use this to send you notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Item Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Item</CardTitle>
        <CardDescription>
          A versatile component that you can use to display any
          content
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Variants
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Item>
              <ItemMedia variant="icon">
                <Star />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Default Item</ItemTitle>
                <ItemDescription>
                  This is a default item variant.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Action
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <Info />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Outline Item</ItemTitle>
                <ItemDescription>
                  This is an outline item variant.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Action
                </Button>
              </ItemActions>
            </Item>
            <Item variant="muted">
              <ItemMedia variant="icon">
                <HelpCircle />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Muted Item</ItemTitle>
                <ItemDescription>This is a muted item variant.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Action
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Size
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Item size="default">
              <ItemMedia variant="icon">
                <Star />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Default Size</ItemTitle>
                <ItemDescription>
                  This is the default size item.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Action
                </Button>
              </ItemActions>
            </Item>
            <Item size="sm">
              <ItemMedia variant="icon">
                <Star />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Small Size</ItemTitle>
                <ItemDescription>This is a small size item.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Action
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Icon
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Item>
              <ItemMedia variant="icon">
                <Mail />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Mail</ItemTitle>
                <ItemDescription>
                  Check your inbox for new messages.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Open
                </Button>
              </ItemActions>
            </Item>
            <Item>
              <ItemMedia variant="icon">
                <CreditCard />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Payment</ItemTitle>
                <ItemDescription>Manage your payment methods.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Avatar
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Item>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>shadcn</ItemTitle>
                <ItemDescription>@shadcn</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Image
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Item>
              <ItemMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?w=300&h=300&fit=crop&crop=face"
                  alt="Sample"
                >
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Sample Image</ItemTitle>
                <ItemDescription>A beautiful sample image.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Group
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <ItemGroup>
              <Item>
                <ItemMedia variant="icon">
                  <Mail />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Inbox</ItemTitle>
                  <ItemDescription>5 unread messages</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </ItemActions>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon">
                  <Star />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Starred</ItemTitle>
                  <ItemDescription>12 starred items</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </ItemActions>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon">
                  <GitBranch />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Projects</ItemTitle>
                  <ItemDescription>3 active projects</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </ItemActions>
              </Item>
            </ItemGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Header
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Item>
              <ItemHeader>
                <ItemTitle>Section Title</ItemTitle>
                <Badge>Featured</Badge>
              </ItemHeader>
              <ItemMedia variant="icon">
                <Info />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Item with Header</ItemTitle>
                <ItemDescription>
                  This item has a custom header section.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Link
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Item as-child>
              <a href="#" class="cursor-pointer">
                <ItemMedia variant="icon">
                  <ArrowUpRight />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Dashboard</ItemTitle>
                  <ItemDescription>Overview of your account and activity.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm"> Go </Button>
                </ItemActions>
              </a>
            </Item>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Dropdown
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Item class="cursor-pointer">
                  <ItemMedia variant="icon">
                    <ChevronDown />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Account</ItemTitle>
                    <ItemDescription>
                      Manage your account settings
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      Open
                    </Button>
                  </ItemActions>
                </Item>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Mail class="mr-2 h-4 w-4" />
                  Messages
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star class="mr-2 h-4 w-4" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ArrowLeft class="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            People List
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <ItemGroup>
              <Item v-for="(person, index) in people" :key="person.username">
                <ItemMedia>
                  <Avatar>
                    <AvatarImage :src="person.avatar" class="grayscale" />
                    <AvatarFallback>
                      {{
                        person.username.charAt(0)
                      }}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent class="gap-1">
                  <ItemTitle>{{ person.username }}</ItemTitle>
                  <ItemDescription>{{ person.email }}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="ghost" size="icon" class="rounded-full">
                    <Plus />
                  </Button>
                </ItemActions>
                <template v-if="index !== people.length - 1">
                  <ItemSeparator />
                </template>
              </Item>
            </ItemGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Music Playlist
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <ItemGroup class="gap-4">
              <Item
                v-for="song in music"
                :key="song.title"
                variant="outline"
                as-child
                role="listitem"
              >
                <a href="#" class="cursor-pointer">
                  <ItemMedia variant="image">
                    <img
                      :src="`https://avatar.vercel.sh/${encodeURIComponent(song.title)}`"
                      :alt="song.title"
                      class="h-8 w-8 rounded-sm object-cover grayscale"
                    >
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle class="line-clamp-1">
                      {{ song.title }} -
                      <span class="text-muted-foreground">{{
                        song.album
                      }}</span>
                    </ItemTitle>
                    <ItemDescription>{{ song.artist }}</ItemDescription>
                  </ItemContent>
                  <ItemContent class="flex-none text-center">
                    <ItemDescription>{{ song.duration }}</ItemDescription>
                  </ItemContent>
                </a>
              </Item>
            </ItemGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Model Cards
          </h3>
          <div class="grid w-full max-w-xl gap-4">
            <ItemGroup class="grid grid-cols-3 gap-4">
              <Item v-for="model in models" :key="model.name" variant="outline">
                <ItemHeader>
                  <img
                    :src="model.image"
                    :alt="model.name"
                    class="aspect-square w-full rounded-sm object-cover"
                  >
                </ItemHeader>
                <ItemContent>
                  <ItemTitle>{{ model.name }}</ItemTitle>
                  <ItemDescription>{{ model.description }}</ItemDescription>
                </ItemContent>
              </Item>
            </ItemGroup>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Kbd Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Kbd</CardTitle>
        <CardDescription>
          Used to display textual user input from keyboard
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Basic
          </h3>
          <div class="flex items-center gap-4">
            <Kbd>Ctrl</Kbd>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌥</Kbd>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Group
          </h3>
          <div class="flex flex-col items-center gap-4">
            <p class="text-muted-foreground text-sm">
              Use
              <KbdGroup>
                <Kbd>Ctrl + B</Kbd>
                <Kbd>Ctrl + K</Kbd>
              </KbdGroup>
              to open the command palette
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Button
          </h3>
          <div class="flex flex-wrap items-center gap-4">
            <Button variant="outline" size="sm" class="pr-2">
              Accept <Kbd>⏎</Kbd>
            </Button>
            <Button variant="outline" size="sm" class="pr-2">
              Cancel <Kbd>Esc</Kbd>
            </Button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Tooltip
          </h3>
          <div class="flex flex-wrap gap-4">
            <ButtonGroup>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button size="sm" variant="outline">
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div class="flex items-center gap-2">
                      Save Changes <Kbd>S</Kbd>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button size="sm" variant="outline">
                      Print
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div class="flex items-center gap-2">
                      Print Document
                      <KbdGroup>
                        <Kbd>Ctrl</Kbd>
                        <Kbd>P</Kbd>
                      </KbdGroup>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ButtonGroup>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Input Group
          </h3>
          <div class="flex w-full max-w-xs flex-col gap-6">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Empty Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Empty</CardTitle>
        <CardDescription>
          Use the Empty component to display an empty state
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Basic
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Cloud />
                </EmptyMedia>
                <EmptyTitle>No data</EmptyTitle>
                <EmptyDescription>No data found</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button>Add data</Button>
              </EmptyContent>
            </Empty>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Outline
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Empty class="border border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Cloud />
                </EmptyMedia>
                <EmptyTitle>Cloud Storage Empty</EmptyTitle>
                <EmptyDescription>
                  Upload files to your cloud storage to access them anywhere.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" size="sm">
                  Upload Files
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Background
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Empty
              class="from-muted/50 to-background h-full bg-gradient-to-b from-30%"
            >
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Bell />
                </EmptyMedia>
                <EmptyTitle>No Notifications</EmptyTitle>
                <EmptyDescription>
                  You're all caught up. New notifications will appear here.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" size="sm">
                  <RotateCcw class="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Avatar
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="default">
                  <Avatar class="size-12">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      class="grayscale"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                </EmptyMedia>
                <EmptyTitle>User Offline</EmptyTitle>
                <EmptyDescription>
                  This user is currently offline. You can leave a message to
                  notify them or try again later.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm">
                  Leave Message
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Avatar Group
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <div
                    class="[&_[data-slot=avatar]]:ring-background flex -space-x-2 [&_[data-slot=avatar]]:size-12 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:grayscale"
                  >
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/maxleiter.png"
                        alt="@maxleiter"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                  </div>
                </EmptyMedia>
                <EmptyTitle>No Team Members</EmptyTitle>
                <EmptyDescription>
                  Invite your team to collaborate on this project.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm">
                  <Plus class="mr-2 h-4 w-4" />
                  Invite Members
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Input Group
          </h3>
          <div class="grid w-full max-w-md gap-4">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>404 - Not Found</EmptyTitle>
                <EmptyDescription>
                  The page you're looking for doesn't exist. Try searching for
                  what you need below.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <InputGroup class="sm:w-3/4">
                  <InputGroupInput placeholder="Try searching for pages..." />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <Kbd>/</Kbd>
                  </InputGroupAddon>
                </InputGroup>
                <EmptyDescription>
                  Need help?
                  <a href="#" class="cursor-pointer">Contact support</a>
                </EmptyDescription>
              </EmptyContent>
            </Empty>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Checkbox Example -->
    <Card>
      <CardHeader>
        <CardTitle>Checkbox</CardTitle>
        <CardDescription>Checkbox component</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label for="terms" class="cursor-pointer">Accept terms and conditions</Label>
        </div>
        <div class="flex items-center space-x-2">
          <Checkbox id="marketing" />
          <Label for="marketing" class="cursor-pointer">Receive marketing emails</Label>
        </div>
      </CardContent>
    </Card>

    <!-- Switch Example -->
    <Card>
      <CardHeader>
        <CardTitle>Switch</CardTitle>
        <CardDescription>Toggle switch component</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label for="airplane-mode" class="cursor-pointer">Airplane Mode</Label>
        </div>
        <div class="flex items-center space-x-2">
          <Switch id="wifi" />
          <Label for="wifi" class="cursor-pointer">WiFi</Label>
        </div>
      </CardContent>
    </Card>

    <!-- Skeleton Example -->
    <Card>
      <CardHeader>
        <CardTitle>Skeleton</CardTitle>
        <CardDescription>Loading placeholder component</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-5/6" />
          <Skeleton class="h-4 w-4/6" />
        </div>
        <div class="flex items-center space-x-4">
          <Skeleton class="h-12 w-12 rounded-full" />
          <div class="flex-1 space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-3/4" />
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Avatar Example -->
    <Card>
      <CardHeader>
        <CardTitle>Avatar</CardTitle>
        <CardDescription>User avatar component</CardDescription>
      </CardHeader>
      <CardContent class="flex gap-4">
        <Avatar>
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>RV</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </CardContent>
    </Card>

    <!-- Alert Dialog Example -->
    <Card>
      <CardHeader>
        <CardTitle>Alert Dialog</CardTitle>
        <CardDescription>Modal dialog for important actions</CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="alert">
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>

    <!-- Dialog Example -->
    <Card>
      <CardHeader>
        <CardTitle>Dialog</CardTitle>
        <CardDescription>Standard dialog component</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div class="space-y-4 p-4">
              <div class="space-y-2">
                <Label for="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div class="space-y-2">
                <Label for="username">Username</Label>
                <Input id="username" placeholder="@username" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>

    <!-- Responsive Dialog Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Responsive Dialog</CardTitle>
        <CardDescription>
          Dialog that adapts to screen size - modal on desktop, bottom sheet on
          mobile
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Basic Dialog
          </h3>
          <div class="flex flex-wrap gap-4">
            <ResponsiveDialog>
              <template #trigger>
                <Button variant="outline">
                  Open Dialog
                </Button>
              </template>
              <template #title>
                Edit Profile
              </template>
              <template #description>
                Make changes to your profile here. Click save when you're done.
              </template>
              <div class="space-y-4 py-4">
                <div class="space-y-2">
                  <Label for="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <template #footer>
                <Button type="submit">
                  Save changes
                </Button>
              </template>
            </ResponsiveDialog>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Form Dialog
          </h3>
          <div class="flex flex-wrap gap-4">
            <ResponsiveDialog>
              <template #trigger>
                <Button>Add Project</Button>
              </template>
              <template #title>
                Create New Project
              </template>
              <template #description>
                Add a new project to get started with your work.
              </template>
              <div class="space-y-4 py-4">
                <div class="space-y-2">
                  <Label for="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="My Awesome Project" />
                </div>
                <div class="space-y-2">
                  <Label for="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Describe your project..."
                    class="min-h-[80px]"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="project-type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">
                        Personal
                      </SelectItem>
                      <SelectItem value="work">
                        Work
                      </SelectItem>
                      <SelectItem value="education">
                        Education
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <template #footer>
                <Button variant="outline" class="mr-2">
                  Cancel
                </Button>
                <Button type="submit">
                  Create Project
                </Button>
              </template>
            </ResponsiveDialog>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Responsive Alert Dialog Examples -->
    <Card>
      <CardHeader>
        <CardTitle>Responsive Alert Dialog</CardTitle>
        <CardDescription>
          Alert dialog that adapts to screen size - modal on desktop, bottom
          sheet on mobile
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Basic Alert
          </h3>
          <div class="flex flex-wrap gap-4">
            <ResponsiveAlertDialog
              title="Are you sure?"
              description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
              @confirm="showToast()"
            >
              <Button variant="destructive">
                Delete Account
              </Button>
            </ResponsiveAlertDialog>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Confirmation with Text Input
          </h3>
          <div class="flex flex-wrap gap-4">
            <ResponsiveAlertDialog
              title="Delete Project"
              description="This will permanently delete the project and all associated data. This action cannot be undone."
              confirm-text="delete project"
              @confirm="showToast()"
            >
              <Button variant="destructive">
                Delete Project
              </Button>
            </ResponsiveAlertDialog>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold">
            Loading State
          </h3>
          <div class="flex flex-wrap gap-4">
            <ResponsiveAlertDialog
              title="Publishing Changes"
              description="Please wait while we publish your changes to production."
              :confirm-loading="true"
              @confirm="showToast()"
            >
              <Button disabled>
                <RotateCcw class="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </Button>
            </ResponsiveAlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Accordion Example -->
    <Card>
      <CardHeader>
        <CardTitle>Accordion</CardTitle>
        <CardDescription>Collapsible content sections</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components' aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>

    <!-- Breadcrumb Example -->
    <Card>
      <CardHeader>
        <CardTitle>Breadcrumb</CardTitle>
        <CardDescription>Navigation breadcrumbs</CardDescription>
      </CardHeader>
      <CardContent>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardContent>
    </Card>

    <!-- Animated Tabs Example -->
    <Card>
      <CardHeader>
        <CardTitle>Animated Tabs</CardTitle>
        <CardDescription>Animated tab navigation component</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <AnimatedTabs v-model="activeTab" :tabs="tabs" />
        <AnimatedTabsContent :active-tab="activeTab" :tabs="tabs">
          <template #tab1>
            <div class="bg-accent/20 rounded-lg p-4">
              <p class="text-sm">
                This is the content for Tab 1
              </p>
            </div>
          </template>
          <template #tab2>
            <div class="bg-accent/20 rounded-lg p-4">
              <p class="text-sm">
                This is the content for Tab 2
              </p>
            </div>
          </template>
          <template #tab3>
            <div class="bg-accent/20 rounded-lg p-4">
              <p class="text-sm">
                This is the content for Tab 3
              </p>
            </div>
          </template>
        </AnimatedTabsContent>
      </CardContent>
    </Card>

    <!-- Backgrounds Example -->
    <Card>
      <CardHeader>
        <CardTitle>Backgrounds</CardTitle>
        <CardDescription>Decorative background components</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="relative h-32 overflow-hidden rounded-lg">
          <Grid class="absolute inset-0" />
          <div class="relative z-10 p-4">
            <p class="text-white">
              Grid Background
            </p>
          </div>
        </div>
        <div class="relative h-32 overflow-hidden rounded-lg border">
          <ArtPlum class="!absolute h-full w-full" />
          <div class="relative z-10 p-4">
            <p class="text-white">
              Art Plum Background
            </p>
          </div>
        </div>
        <div class="relative h-32 overflow-hidden rounded-lg border">
          <Spotlight class="absolute inset-0" />
          <div class="relative z-10 p-4">
            <p class="text-white">
              Spotlight Background
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Calendar Example -->
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription>Date picker calendar component</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar v-model="selectedDate" />
        <p class="text-muted-foreground mt-2 text-sm">
          Selected date: {{ selectedDate }}
        </p>
      </CardContent>
    </Card>

    <!-- Color Picker Example -->
    <Card>
      <CardHeader>
        <CardTitle>Color Picker</CardTitle>
        <CardDescription>Color selection component</CardDescription>
      </CardHeader>
      <CardContent>
        <ColorPicker v-model="selectedColor" />
        <p class="text-muted-foreground mt-2 text-sm">
          Selected color: {{ selectedColor }}
        </p>
      </CardContent>
    </Card>

    <!-- DatePicker Jalali Example -->
    <Card>
      <CardHeader>
        <CardTitle>DatePicker Jalali</CardTitle>
        <CardDescription>Persian calendar date picker</CardDescription>
      </CardHeader>
      <CardContent>
        <DatepickerJalali v-model="jalaliDate" />
        <p class="text-muted-foreground mt-2 text-sm">
          Selected Jalali date: {{ jalaliDate }}
        </p>
      </CardContent>
    </Card>

    <!-- Dropdown Menu Example -->
    <Card>
      <CardHeader>
        <CardTitle>Dropdown Menu</CardTitle>
        <CardDescription>Context menu component</CardDescription>
      </CardHeader>
      <CardContent>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              Open Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>

    <!-- Hover Card Example -->
    <Card>
      <CardHeader>
        <CardTitle>Hover Card</CardTitle>
        <CardDescription>Hover-triggered card component</CardDescription>
      </CardHeader>
      <CardContent>
        <HoverCard>
          <HoverCardTrigger as-child>
            <Button variant="link">
              @radix-vue
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div class="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/radix-vue.png" />
                <AvatarFallback>RV</AvatarFallback>
              </Avatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">
                  @radix-vue
                </h4>
                <p class="text-sm">
                  Vue port of Radix UI primitives.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>

    <!-- Input OTP Example -->
    <!-- Input OTP Example -->
    <Card>
      <CardHeader>
        <CardTitle>Input OTP</CardTitle>
        <CardDescription>One-time password input component</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <Label>Enter OTP</Label>
          <InputOtp />
        </div>
      </CardContent>
    </Card>

    <!-- Popover Example -->
    <Card>
      <CardHeader>
        <CardTitle>Popover</CardTitle>
        <CardDescription>Floating content component</CardDescription>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline">
              Open Popover
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="leading-none font-medium">
                  Dimensions
                </h4>
                <p class="text-muted-foreground text-sm">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div class="grid gap-2">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label html-for="width">Width</Label>
                  <Input
                    id="width"
                    default-value="100%"
                    class="col-span-2 h-8"
                  />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label html-for="height">Height</Label>
                  <Input
                    id="height"
                    default-value="25px"
                    class="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>

    <!-- Range Calendar Example -->
    <Card>
      <CardHeader>
        <CardTitle>Range Calendar</CardTitle>
        <CardDescription>Date range picker component</CardDescription>
      </CardHeader>
      <CardContent>
        <RangeCalendar v-model="dateRange" />
        <p class="text-muted-foreground mt-2 text-sm">
          Selected range: {{ dateRange }}
        </p>
      </CardContent>
    </Card>

    <!-- Rest Text Example -->
    <Card>
      <CardHeader>
        <CardTitle>Rest Text</CardTitle>
        <CardDescription>Text truncation component</CardDescription>
      </CardHeader>
      <CardContent>
        <RestText
          text="This is a very long text that will be truncated if it exceeds the maximum length specified."
          :limit="50"
        />
      </CardContent>
    </Card>

    <!-- Select Example -->
    <Card>
      <CardHeader>
        <CardTitle>Select</CardTitle>
        <CardDescription>Dropdown select component</CardDescription>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">
              Apple
            </SelectItem>
            <SelectItem value="banana">
              Banana
            </SelectItem>
            <SelectItem value="orange">
              Orange
            </SelectItem>
            <SelectItem value="grape">
              Grape
            </SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>

    <!-- Sonner Example -->
    <Card>
      <CardHeader>
        <CardTitle>Sonner</CardTitle>
        <CardDescription>Toast notification component</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" @click="showToast">
          Show Toast
        </Button>
      </CardContent>
    </Card>

    <!-- Tooltip Example -->
    <Card>
      <CardHeader>
        <CardTitle>Tooltip</CardTitle>
        <CardDescription>Hover tooltip component</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline">
                Hover me
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  </div>
</template>
