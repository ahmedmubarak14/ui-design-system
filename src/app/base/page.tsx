"use client";

import * as React from "react";
import {
  Mail, Search, Eye, Calendar, Globe, Settings, Plus, Heart, Star, Download,
} from "lucide-react";
import { ShowcaseLayout, ShowcaseSection, ShowcaseRow } from "@/components/showcase";
import { Button } from "@/components/base/button";
import { Badge, BadgeGroup, Tag } from "@/components/base/badge";
import { Avatar, AvatarGroup } from "@/components/base/avatar";
import { Input, Textarea, Label, FormField } from "@/components/base/input";
import { Checkbox, Radio, RadioGroup, Toggle } from "@/components/base/forms";
import {
  Select, Slider, ProgressBar, ProgressRing, Tooltip, FeaturedIcon, Spinner, RatingStars,
} from "@/components/base/misc";

export default function BasePage() {
  const [checked, setChecked] = React.useState(true);
  const [radio, setRadio] = React.useState("a");
  const [toggle, setToggle] = React.useState(true);

  return (
    <ShowcaseLayout
      title="Base components"
      description="Primitives that compose into everything else. Built with TypeScript and Tailwind, accessible by default."
    >
      <ShowcaseSection title="Buttons" description="7 variants × 5 sizes, plus icon-only">
        <div className="space-y-6">
          <ShowcaseRow label="primary">
            <Button size="sm">Sign in</Button>
            <Button size="md">Sign in</Button>
            <Button size="lg">Sign in</Button>
            <Button size="xl">Sign in</Button>
            <Button size="2xl">Sign in</Button>
          </ShowcaseRow>
          <ShowcaseRow label="secondary">
            <Button variant="secondary">Cancel</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Read more</Button>
          </ShowcaseRow>
          <ShowcaseRow label="destructive">
            <Button variant="destructive">Delete</Button>
            <Button variant="destructive-secondary">Delete</Button>
          </ShowcaseRow>
          <ShowcaseRow label="with icon">
            <Button><Plus />New project</Button>
            <Button variant="secondary"><Download />Download</Button>
            <Button size="icon-md"><Settings /></Button>
          </ShowcaseRow>
          <ShowcaseRow label="state">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button><Spinner size="sm" />Loading</Button>
          </ShowcaseRow>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Badges & tags">
        <div className="space-y-6">
          <ShowcaseRow label="colors">
            <Badge color="gray">Label</Badge>
            <Badge color="brand">Label</Badge>
            <Badge color="success">Label</Badge>
            <Badge color="warning">Label</Badge>
            <Badge color="error">Label</Badge>
          </ShowcaseRow>
          <ShowcaseRow label="with dot">
            <Badge color="success" dot>Online</Badge>
            <Badge color="warning" dot>Pending</Badge>
            <Badge color="error" dot>Offline</Badge>
          </ShowcaseRow>
          <ShowcaseRow label="solid">
            <Badge color="brand" variant="solid">New</Badge>
            <Badge color="success" variant="solid">Live</Badge>
            <Badge color="error" variant="solid">3</Badge>
          </ShowcaseRow>
          <ShowcaseRow label="dismissible">
            <Badge color="brand" onRemove={() => {}}>Filter</Badge>
            <Tag onRemove={() => {}}>Design</Tag>
            <Tag onRemove={() => {}}>Engineering</Tag>
          </ShowcaseRow>
          <ShowcaseRow label="badge group">
            <BadgeGroup leadingText="New feature" color="brand">Check it out →</BadgeGroup>
          </ShowcaseRow>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Avatars">
        <div className="space-y-6">
          <ShowcaseRow label="sizes">
            <Avatar size="xs" initials="AM" />
            <Avatar size="sm" initials="AM" />
            <Avatar size="md" initials="AM" />
            <Avatar size="lg" initials="AM" />
            <Avatar size="xl" initials="AM" />
            <Avatar size="2xl" initials="AM" />
          </ShowcaseRow>
          <ShowcaseRow label="status">
            <Avatar initials="AM" status="online" />
            <Avatar initials="JS" status="away" />
            <Avatar initials="KL" status="busy" />
            <Avatar initials="MR" status="offline" />
          </ShowcaseRow>
          <ShowcaseRow label="group">
            <AvatarGroup
              avatars={[
                { initials: "AM" }, { initials: "JS" }, { initials: "KL" },
                { initials: "MR" }, { initials: "TC" }, { initials: "PD" },
              ]}
            />
          </ShowcaseRow>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Inputs & forms">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField label="Email" required helperText="We'll never share your email">
            <Input type="email" placeholder="you@example.com" leadingIcon={<Mail />} />
          </FormField>
          <FormField label="Search">
            <Input type="search" placeholder="Search..." leadingIcon={<Search />} />
          </FormField>
          <FormField label="Website">
            <Input type="url" placeholder="example.com" prefix="https://" />
          </FormField>
          <FormField label="Password" error="Password must be at least 8 characters">
            <Input type="password" trailingIcon={<Eye />} invalid />
          </FormField>
          <FormField label="Country">
            <Select>
              <option>United States</option>
              <option>Saudi Arabia</option>
              <option>United Kingdom</option>
            </Select>
          </FormField>
          <FormField label="Birthday">
            <Input type="date" leadingIcon={<Calendar />} />
          </FormField>
          <div className="md:col-span-2">
            <FormField label="Bio" helperText="Tell us a little about yourself">
              <Textarea placeholder="I'm a..." rows={4} />
            </FormField>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Selection controls">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Label>Checkboxes</Label>
            <div className="mt-3 space-y-3">
              <Checkbox label="Default" defaultChecked />
              <Checkbox label="Unchecked" />
              <Checkbox label="With description" description="Send me product updates" defaultChecked />
              <Checkbox label="Indeterminate" indeterminate />
              <Checkbox label="Disabled" disabled />
            </div>
          </div>
          <div>
            <Label>Radio group</Label>
            <RadioGroup className="mt-3">
              <Radio name="r1" label="Option A" value="a" checked={radio === "a"} onChange={(e) => setRadio(e.target.value)} />
              <Radio name="r1" label="Option B" value="b" checked={radio === "b"} onChange={(e) => setRadio(e.target.value)} />
              <Radio name="r1" label="With description" description="More details here" value="c" checked={radio === "c"} onChange={(e) => setRadio(e.target.value)} />
            </RadioGroup>
          </div>
          <div>
            <Label>Toggles</Label>
            <div className="mt-3 space-y-4">
              <Toggle label="Notifications" checked={toggle} onChange={(e) => setToggle(e.target.checked)} />
              <Toggle label="Marketing emails" description="Get tips and product news" />
              <Toggle label="Disabled" disabled />
              <Toggle size="sm" label="Small toggle" defaultChecked />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sliders & progress">
        <div className="space-y-6">
          <div>
            <Label>Volume</Label>
            <Slider defaultValue={65} showValue className="mt-2" />
          </div>
          <div>
            <Label>Progress bar</Label>
            <div className="mt-3 space-y-3">
              <ProgressBar value={32} showLabel />
              <ProgressBar value={68} showLabel color="success" />
              <ProgressBar value={88} showLabel color="warning" size="lg" />
            </div>
          </div>
          <ShowcaseRow label="ring">
            <ProgressRing value={25} />
            <ProgressRing value={50} color="success" />
            <ProgressRing value={75} color="warning" />
            <ProgressRing value={92} color="error" />
          </ShowcaseRow>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Misc">
        <div className="space-y-8">
          <ShowcaseRow label="featured">
            <FeaturedIcon><Heart /></FeaturedIcon>
            <FeaturedIcon color="success" variant="outline"><Heart /></FeaturedIcon>
            <FeaturedIcon color="warning" variant="modern"><Heart /></FeaturedIcon>
            <FeaturedIcon color="error" size="lg"><Heart /></FeaturedIcon>
            <FeaturedIcon size="xl" variant="outline"><Globe /></FeaturedIcon>
          </ShowcaseRow>
          <ShowcaseRow label="rating">
            <RatingStars value={4.5} />
            <RatingStars value={3} />
            <RatingStars value={5} size={20} />
          </ShowcaseRow>
          <ShowcaseRow label="tooltip">
            <Tooltip content="Add to favorites">
              <Button variant="secondary" size="icon-md"><Star /></Button>
            </Tooltip>
            <Tooltip content="On the bottom" side="bottom">
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </ShowcaseRow>
          <ShowcaseRow label="spinner">
            <Spinner size="xs" className="text-brand-600" />
            <Spinner size="sm" className="text-brand-600" />
            <Spinner size="md" className="text-brand-600" />
            <Spinner size="lg" className="text-brand-600" />
          </ShowcaseRow>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
