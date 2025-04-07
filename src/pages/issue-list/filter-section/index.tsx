import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFilterIssue } from '@/hooks/useFilterIssue';

const filterSchema = z.object({
	title: z.string().optional(),
	body: z.string().optional(),
	state: z.string().optional(),
});

type FilterValues = z.input<typeof filterSchema>;

const stateOptions = [
	{ label: 'All', value: '' },
	{ label: 'Open', value: 'open' },
	{ label: 'Closed', value: 'closed' },
];

export default function FilterSection() {
	const { title, setTitle, body, setBody, state, setState } = useFilterIssue();

	const form = useForm<FilterValues>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			title: title ?? '',
			body: body ?? '',
			state: state ?? '',
		},
	});

	const onSubmit = (values: FilterValues) => {
		setTitle(values?.title ?? null);
		setBody(values?.body ?? null);
		setState(values?.state ?? null);
	};

	return (
		<Form {...form}>
			<form
				className="space-y-6"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex items-end gap-3">
					<FormField
						render={({ field }) => (
							<FormItem className="grow">
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Search in title..."
										type="text"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						control={form.control}
						name="title"
					/>
					<FormField
						render={({ field }) => (
							<FormItem className="grow">
								<FormLabel>Body</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Search in issue body..."
										type="text"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						control={form.control}
						name="body"
					/>
					<Button
						className="cursor-pointer"
						type="submit"
					>
						Search
					</Button>
				</div>

				<FormField
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<FormControl>
								<RadioGroup
									className="flex flex-row gap-4"
									value={field.value}
									onValueChange={field.onChange}
								>
									{stateOptions.map(({ label, value }) => (
										<div
											className="flex items-center space-x-2"
											key={value}
										>
											<RadioGroupItem
												id={value || 'all'}
												value={value}
											/>
											<Label htmlFor={value || 'all'}>{label}</Label>
										</div>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					control={form.control}
					name="state"
				/>
			</form>
		</Form>
	);
}
