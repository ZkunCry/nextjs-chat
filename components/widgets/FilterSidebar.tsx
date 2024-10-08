"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import SideBar from "./SideBar";
import { Checkbox } from "@/components/ui/checkbox";
import { filterSchema } from "@/schemas/filterSchema";
import { DatePickerWithRange } from "./DatePickerRange";

const items = [
  { id: "healthy", label: "Healthy" },
  { id: "fast", label: "Fast" },
  { id: "vegan", label: "Vegan" },
] as const;

const FilterSidebar = () => {
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      items: [],
      date: {
        from: new Date(),
        to: new Date(),
      },
      useDate: false, // Новое поле для управления включением/выключением выбора даты
    },
  });

  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const subscription = form.watch((value) => {
      setSelectedCount(value.items.length);
      // Очищаем дату, если чекбокс отключен
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(data: z.infer<typeof filterSchema>) {
    console.log(data);
  }
  const isVisible = form.watch("useDate");
  console.log(isVisible);
  return (
    <SideBar className="w-full flex flex-col self-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion className="border rounded-sm px-2" type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem className="flex items-center !space-y-0 gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{item.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-none" value="item-2">
              <AccordionTrigger>Date</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="useDate"
                  render={({ field }) => (
                    <FormItem className="flex items-center !space-y-0 gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            // Очищаем дату при отключении чекбокса
                            if (!checked) {
                              form.setValue("date", { from: null, to: null });
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel>Use Date</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DatePickerWithRange
                          disabled={!isVisible}
                          onSelect={field.onChange}
                          selected={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {selectedCount > 0 && (
            <div className="filters_actions mt-2">
              <Button className="mb-2 w-full" type="submit">
                Submit
              </Button>
              <Button
                onClick={() => {
                  form.reset();
                }}
                variant={"outline"}
                className="w-full"
                type="button"
              >
                Clear
              </Button>
            </div>
          )}
        </form>
      </Form>
      <Link
        className="w-full border hover:bg-accent hover:text-accent-foreground mt-2 p-2 text-center font-medium text-sm bg-white rounded-lg text-black"
        href={"/"}
      >
        Предложить новость
      </Link>
    </SideBar>
  );
};

export default FilterSidebar;
