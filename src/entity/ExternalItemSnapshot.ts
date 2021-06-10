import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExternalItemSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column()
  externalId: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  quantity: string;

  @Column()
  width: string;

  @Column()
  height: string;

  @Column()
  depth: string;

  @Column()
  bowlDepth: string;

  @Column()
  condition: string;

  @Column()
  type: string;

  @Column()
  material: string;

  @Column()
  brand: string;

  @Column()
  color: string;

  @Column()
  info: string;

  @Column()
  finish: string;

  @Column()
  jobNumber: string;
}
