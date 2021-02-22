import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  quantity: string;

  @Column()
  condition: string;

  @Column()
  jobNumber: string;
}
