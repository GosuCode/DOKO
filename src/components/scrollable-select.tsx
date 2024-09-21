import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable({
  name,
  onChange,
}: {
  name: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Select name={name} onValueChange={onChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Jewelry & Accessories</SelectLabel>
          <SelectItem value="necklaces_bracelets">
            Necklaces & Bracelets
          </SelectItem>
          <SelectItem value="rings">Rings</SelectItem>
          <SelectItem value="scarves_shawls">Scarves & Shawls</SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Home Decor & Furniture</SelectLabel>
          <SelectItem value="pottery">Pottery & Ceramics</SelectItem>
          <SelectItem value="rugs_tapestries">Rugs & Tapestries</SelectItem>
          <SelectItem value="furniture">Handcrafted Furniture</SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Clothing & Textiles</SelectLabel>
          <SelectItem value="traditional_wear">
            Traditional Nepali Wear
          </SelectItem>
          <SelectItem value="handwoven_fabrics">Handwoven Fabrics</SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Wellness & Beauty</SelectLabel>
          <SelectItem value="organic_skincare">Organic Skincare</SelectItem>
          <SelectItem value="essential_oils">
            Essential Oils & Incense
          </SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Art & Craft</SelectLabel>
          <SelectItem value="paintings_sculptures">
            Paintings & Sculptures
          </SelectItem>
          <SelectItem value="traditional_instruments">
            Traditional Instruments
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
